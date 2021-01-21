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
import { PropertyFieldFilePicker, IPropertyFieldFilePickerProps, IFilePickerResult } from "@pnp/spfx-property-controls/lib/PropertyFieldFilePicker";
import { displayView } from '../imageSlider/models/enums';
import * as strings from 'ImageSliderWebPartStrings';
import ImageSlider from './components/ImageSlider';
import { IImageSliderProps } from './components/IImageSliderProps';

export interface IImageSliderWebPartProps {
  filePickerResult: IFilePickerResult;
  imagesDisplay: displayView;
  slideSpeed: number;
  captionDisplay: boolean;
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
        filePickerResult: this.properties.filePickerResult,
        displayView: this.properties.imagesDisplay,
        slideSpeed: this.properties.slideSpeed * 1000,
        captionDisplay: this.properties.captionDisplay
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
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: "Display Options",
              groupFields: [
                PropertyPaneDropdown('imagesDisplay', {
                  label: 'Images to Display',
                  options: [
                    { key: displayView.AllImages, text: 'Display All Images' },
                    { key: displayView.EnabledOnly, text: 'Display Only Enabled Images' },
                    { key: displayView.PublicDates, text: 'Display Based on Publish Dates' }
                  ],
                  selectedKey: displayView.AllImages
                }),
                PropertyPaneSlider('slideSpeed',{  
                  label:"Slide Speed",  
                  min: 5,  
                  max: 30,  
                  value: this.properties.slideSpeed,  
                  showValue: true,  
                  step: 1                
                }),
                PropertyPaneToggle('captionDisplay',{
                  label: "Display Image Caption",
                  checked: this.properties.captionDisplay,
                  onText: "Show",
                  offText: "Hidden"
                })
              ]
            },
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyFieldFilePicker('filePicker', {
                  context: this.context,
                  filePickerResult: this.properties.filePickerResult,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  onSave: (e: IFilePickerResult) => { console.log(e); this.properties.filePickerResult = e;  },
                  onChanged: (e: IFilePickerResult) => { console.log(e); this.properties.filePickerResult = e; },
                  key: "filePickerId",
                  buttonLabel: "File Picker",
                  label: "File Picker"             
              })
              ]
            }
          ]
        }
      ]
    };
  }
}
