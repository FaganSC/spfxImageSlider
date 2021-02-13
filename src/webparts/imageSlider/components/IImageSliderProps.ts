import { IFilePickerResult } from "@pnp/spfx-property-controls/lib/PropertyFieldFilePicker";
import { displayView, imageSize, orderBy, orderByDirection } from "../models/enums";
export interface IImageSliderProps {
  context: any;
  imageSize: imageSize;
  defaultFilePicker: IFilePickerResult;
  orderBy: orderBy;
  orderByDirection: orderByDirection;
  displayView: displayView;
  slideSpeed: number;
  captionDisplay: boolean;
  cdnEnabled: boolean;
  showIndicators: boolean;
}
