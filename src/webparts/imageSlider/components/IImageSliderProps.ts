import { IFilePickerResult } from "@pnp/spfx-property-controls/lib/PropertyFieldFilePicker";
import { displayView, imageSize } from "../models/enums";
export interface IImageSliderProps {
  context: any;
  imageSize: imageSize;
  filePickerResult: IFilePickerResult;
  displayView: displayView;
  slideSpeed: number;
  captionDisplay: boolean;
  cdnEnabled: boolean;
  showIndicators: boolean;
}
