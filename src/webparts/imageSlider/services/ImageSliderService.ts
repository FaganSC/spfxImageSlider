import * as React from 'react';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { PnPClientStorage } from "@pnp/common";
import { SliderImageItems } from '../models/SliderImageItems';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { sampleData } from './ImageSliderServiceData';

export class ImageSliderService {
    public static GetItems(context:any): Promise<SliderImageItems[]> {
        const storage = new PnPClientStorage();
        const test: boolean = true;
        let cacheKey: string = `SliderImageItems`;
        if (Environment.type === EnvironmentType.Local || test) {
            return new Promise<SliderImageItems[]>((resolve, reject) => {
                resolve(sampleData);
            });
        } else {
            let links: SliderImageItems[] = storage.local.get(cacheKey);
            return new Promise<SliderImageItems[]>((resolve, reject) => {
                if (links) {
                    resolve(links);
                } else {
                    let itemsPromise = this.getSPItems();
                    Promise.all([itemsPromise]).then((results: any[]) => {
                        links = this.convertItems(context,results[0]);
                        storage.local.put(cacheKey, links);
                        resolve(links);
                    });
                }
            });
        }
    }

    private static getSPItems() {
        return new Promise<any[]>((resolve, reject) => {
            sp.web.lists.getByTitle("Hero Images").items
                .select('Id,Title,LinkFilename,HeroPublishStart,HeroPublishEnd,HeroEnabled,HeroLink,HeroNewTab,HeroEnabled')      
                .filter("HeroEnabled eq 1")
                .orderBy("HeroPublishStart")
                .get()
                .then((items: any[]) => {
                    console.log(items);
                    resolve(items);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    private static convertItems(context:any, items: any[]): SliderImageItems[] {
        let url: string = context.pageContext.web.absoluteUrl;
        var initalData: SliderImageItems[] = items.map((item: any) => {
            var newItem = {
                Title: item.Title,
                LinkFilename: url + "/HeroImages/" + item.LinkFilename,
                HeroPublishStart: item.HeroPublishStart,
                HeroPublishEnd: item.HeroPublishEnd,
                HeroLink: item.HeroLink.Url,
                HeroNewTab: item.HeroNewTab,
                HeroEnabled: item.HeroEnabled,
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