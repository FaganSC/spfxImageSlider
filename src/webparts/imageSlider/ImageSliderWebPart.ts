import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneSlider,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { sp } from '@pnp/sp';
import { PropertyFieldFilePicker, IFilePickerResult } from "@pnp/spfx-property-controls/lib/PropertyFieldFilePicker";
import { PropertyPaneWebPartInformation } from '@pnp/spfx-property-controls/lib/PropertyPaneWebPartInformation';
import { displayView, imageSize, orderBy, orderByDirection } from '../imageSlider/models/enums';
import * as strings from 'ImageSliderWebPartStrings';
import ImageSlider from './components/ImageSlider';
import { IImageSliderProps } from './components/IImageSliderProps';

export interface IImageSliderWebPartProps {
  imageSize: number;
  defaultFilePicker: IFilePickerResult;
  imagesDisplay: displayView;
  orderBy: orderBy;
  orderByDirection: orderByDirection;
  slideSpeed: number;
  captionDisplay: boolean;
  cdnStatus: boolean;
  showIndicators: boolean;
}

export default class ImageSliderWebPart extends BaseClientSideWebPart<IImageSliderWebPartProps> {
  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<IImageSliderProps> = React.createElement(
      ImageSlider,
      {
        context: this.context,
        imageSize: this.properties.imageSize,
        orderBy: this.properties.orderBy,
        orderByDirection: this.properties.orderByDirection,
        defaultFilePicker: this.properties.defaultFilePicker,
        displayView: this.properties.imagesDisplay,
        slideSpeed: this.properties.slideSpeed * 1000,
        captionDisplay: this.properties.captionDisplay,
        cdnEnabled: this.properties.cdnStatus,
        showIndicators: this.properties.showIndicators
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    let displayOrderByOption: any = [];
    let displayOrderByDirectionOption: any = [];
    if (this.properties.imagesDisplay !== displayView.PublicDates){
      displayOrderByOption = PropertyPaneDropdown('orderBy', {
        label: 'Order Images By',
        options: [
          { key: orderBy.Modified, text: 'Modified Date' },
          { key: orderBy.Created, text: 'Created Date' },
          { key: orderBy.DisplayOrder, text: 'Display Order Field' }
        ],
        selectedKey: this.properties.orderBy === null ? orderBy.Modified : this.properties.orderBy
      });

      displayOrderByDirectionOption = PropertyPaneDropdown('orderByDirection', {
        label: 'Order By Direction',
        options: [
          { key: orderByDirection.Ascending, text: 'Ascending' },
          { key: orderByDirection.Descending, text: 'Descending' },
        ],
        selectedKey: this.properties.orderByDirection === null ?  orderByDirection.Ascending : this.properties.orderByDirection
      });
    }

    return {
      pages: [
        {
          header: {
            description: null
          },
          groups: [
            {
              groupName: "Display Options",
              groupFields: [
                PropertyPaneDropdown('imageSize', {
                  label: 'Image Size',
                  options: [
                    { key: imageSize.Small, text: 'Small (Height: 300px)' },
                    { key: imageSize.Medium, text: 'Medium (Height: 350px)' },
                    { key: imageSize.Large, text: 'Large (Height: 400px)' },
                    { key: imageSize.XLarge, text: 'X-Large (Height: 450px)' },
                  ],
                  selectedKey: this.properties.imageSize === null ?  imageSize.Medium : this.properties.imageSize
                }),
                PropertyPaneSlider('slideSpeed', {
                  label: "Slide Speed",
                  min: 5,
                  max: 30,
                  value: this.properties.slideSpeed,
                  showValue: true,
                  step: 1
                }),
                PropertyPaneDropdown('imagesDisplay', {
                  label: 'Filter images for display',
                  options: [
                    { key: displayView.AllImages, text: 'Display All Images' },
                    { key: displayView.EnabledOnly, text: 'Display Only Enabled Images' },
                    { key: displayView.PublicDates, text: 'Display Based on Publish Dates' }
                  ],
                  selectedKey: this.properties.imagesDisplay === null ?  displayView.AllImages : this.properties.imagesDisplay
                }),
                displayOrderByOption,
                displayOrderByDirectionOption,
                PropertyPaneToggle('captionDisplay', {
                  label: "Display Slide Caption",
                  checked: this.properties.captionDisplay,
                  onText: "Show",
                  offText: "Hidden"
                }),
                PropertyPaneToggle('showIndicators', {
                  label: "Display Slide Indicators",
                  checked: this.properties.showIndicators,
                  onText: "Display",
                  offText: "Hidden"
                }),
                PropertyPaneToggle('cdnStatus', {
                  label: "Render Images using Office 365 Public CDN",
                  checked: this.properties.cdnStatus,
                  onText: "Enabled",
                  offText: "Disabled"
                }),
                PropertyFieldFilePicker('defaultFilePicker', {
                  context: this.context,
                  filePickerResult: this.properties.defaultFilePicker,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  onSave: (e: IFilePickerResult) => { console.log(e); this.properties.defaultFilePicker = e; },
                  onChanged: (e: IFilePickerResult) => { console.log(e); this.properties.defaultFilePicker = e; },
                  key: "filePickerId",
                  buttonLabel: "Image Selector",
                  label: "Select Default Image"
                })
              ]
            },
            {
              groupName: "Web Part Support",
              groupFields: [
                PropertyPaneWebPartInformation({
                  description: `This web part is an open source project, hosted on <a href='https://github.com/' target="_blank">GitHub</a>. If you have an issue, please submit an issue on the <a href="https://github.com/FaganSC/spfxImageSlider/issues" target="_blank">GitHub Issues</a>.`,
                  moreInfoLink: `https://github.com/FaganSC/spfxImageSlider`,
                  key: 'webPartInfoId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
