import { IFilePickerResult } from "@pnp/spfx-property-controls/lib/PropertyFieldFilePicker";
import { displayView } from "../models/enums";
export interface IImageSliderProps {
  context: any;
  filePickerResult: IFilePickerResult;
  displayView: displayView;
  slideSpeed: number;
  captionDisplay: boolean;
}
