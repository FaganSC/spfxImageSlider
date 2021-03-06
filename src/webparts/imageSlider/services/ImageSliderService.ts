import * as React from 'react';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { PnPClientStorage } from "@pnp/common";
import { SliderImageItems } from '../models/SliderImageItems';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { sampleData } from './ImageSliderServiceData';
import * as moment from 'moment';
import { displayView, orderBy, orderByDirection} from '../models/enums';
import { IList } from '@pnp/sp/lists';
import { IItems } from '@pnp/sp/items';
export class ImageSliderService {
    public static GetItems(context:any, wpDisplayView: displayView, imgOrderBy: orderBy, imgOrderByDirection: orderByDirection, cdnEnabled: boolean): Promise<SliderImageItems[]> {
        const storage = new PnPClientStorage();
        const test: boolean = false;
        let cacheKey: string = `SliderImageItems`;
        if (Environment.type === EnvironmentType.Local || test) {
            return new Promise<SliderImageItems[]>((resolve, reject) => {
                resolve(sampleData);
            });
        } else {
            let links: SliderImageItems[] = storage.local.get(cacheKey);
            return new Promise<SliderImageItems[]>((resolve, reject) => {
                //if (links) {
                //    resolve(links);
                //} else {
                    let itemsPromise = this.getSPItems(wpDisplayView, imgOrderBy, imgOrderByDirection);
                    Promise.all([itemsPromise]).then((results: any[]) => {
                        links = this.convertItems(context,results[0], cdnEnabled);
                        storage.local.put(cacheKey, links);
                        resolve(links);
                    });
                //}
            });
        }
    }

    private static getSPItems(wpDisplayView: displayView, imgOrderBy: orderBy, imgOrderByDirection: orderByDirection) {
        var filterDate = moment().format("YYYY-MM-DD");
        let blOrderByDirection: boolean = true;
        if (imgOrderByDirection === orderByDirection.Descending){
            blOrderByDirection = false;
        }
        return new Promise<any[]>((resolve, reject) => {
            var spItems: IItems = sp.web.lists.getByTitle("Slider Images").items;
            spItems.select("Id,Title,LinkFilename,ImgSliderCaptions,ImgSliderPublishStart,ImgSliderPublishEnd,ImgSliderEnabled,ImgSliderLink,ImgSliderNewTab,ImgSliderEnabled,Modified,Created,ImgSliderDisplayOrder,EncodedAbsUrl");
            if (wpDisplayView === displayView.EnabledOnly){
                spItems.filter("ImgSliderEnabled eq 1");
                spItems.orderBy("Modified");
            } else if (wpDisplayView === displayView.PublicDates){
                spItems.filter("ImgSliderPublishStart le '" + filterDate + "' and ImgSliderPublishEnd ge '" + filterDate + "'");
                spItems.orderBy("ImgSliderPublishStart");
            }

            switch(imgOrderBy){
                case orderBy.Created:
                    spItems.orderBy("Created", blOrderByDirection);
                    break;
                case orderBy.DisplayOrder:
                    spItems.orderBy("ImgSliderDisplayOrder", blOrderByDirection);
                    break;
                default:
                    spItems.orderBy("Modified", blOrderByDirection);
            }
            spItems.get()
            .then((items: any[]) => {    
                resolve(items);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    private static convertItems(context:any, items: any[], cdnEnabled: boolean): SliderImageItems[] {
        let url: string = context.pageContext.web.absoluteUrl;
        var initalData: SliderImageItems[] = items.map((item: any) => {
            let imgPath: string = item.EncodedAbsUrl;
            if (cdnEnabled){
                imgPath = item.EncodedAbsUrl.replace('https://','https://publiccdn.sharepointonline.com/');
            }
            var newItem = {
                Title: item.Title,
                Caption: item.ImgSliderCaptions,
                LinkFilename: imgPath,
                ImgSliderPublishStart: item.ImgSliderPublishStart,
                ImgSliderPublishEnd: item.ImgSliderPublishEnd,
                ImgSliderLink: item.ImgSliderLink !== null ? item.ImgSliderLink.Url : null,
                ImgSliderNewTab: item.ImgSliderNewTab,
                ImgSliderEnabled: item.ImgSliderEnabled,
            };
            return newItem;
        });
        var retVal: SliderImageItems[] = [];
        for (let c of initalData) {
            if (c !== undefined) {
                retVal.push(c);
            }
        }
        return retVal;
    }
}
