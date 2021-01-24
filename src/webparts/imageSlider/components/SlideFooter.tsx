import * as React from "react";
import { SliderImageItems } from "../models/SliderImageItems";
import styles from "./ImageSlider.module.scss";
import { Indicators } from "./Indicators";
export interface ISlideFooterProps {
  parent: any;
  activeIndex: number;
  showIndicators: boolean;
  slideCount: number;
  captionDisplay:boolean;
  activeSlide: SliderImageItems;
}

export interface ISlideFooterState {}

export class SlideFooter extends React.Component<ISlideFooterProps, ISlideFooterState> {
  constructor(props) {
    super(props);
  }

  public render(): React.ReactElement<ISlideFooterProps> {
    const { activeIndex, showIndicators,slideCount,captionDisplay,activeSlide,parent } = this.props;
    return (
      <div className={styles.sliderFooter}>
      {showIndicators ? <Indicators parent={parent} index={activeIndex} slidesCount={slideCount} display={true}/> : undefined }
      {captionDisplay && activeSlide.Title !== null && activeSlide.Caption !== null ? (
        <div className={styles.caption}>
          <div className={styles.captionContent}>
            <span className={styles.captionTitle}>
              {activeSlide.Title}
            </span>
            <span>{activeSlide.Caption}</span>
          </div>
        </div>
      ) : undefined}
      </div>
    );
  }
}
