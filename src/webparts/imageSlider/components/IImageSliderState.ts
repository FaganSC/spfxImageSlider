import { SliderImageItems } from '../models/SliderImageItems';
export interface IImageSliderState {
    slides: SliderImageItems[];
    activeIndex: number;
    //count: number;
    speed: number;
    running: boolean;
    caption: boolean;
  }
  