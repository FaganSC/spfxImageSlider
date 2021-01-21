import * as React from "react";
import { SliderImageItems } from "../models/SliderImageItems";
import styles from "./ImageSlider.module.scss";
import { IImageSliderProps } from "./IImageSliderProps";
import { Indicators } from "./Indicators";
export interface ISlideProps {
  parent: any;
  index: number;
  slide: SliderImageItems;
  slidesCount: number;
  wpProps: IImageSliderProps;
}

export interface ISlideState {}

export class Slide extends React.Component<ISlideProps, ISlideState> {
  constructor(props) {
    super(props);
  }

  public render(): React.ReactElement<ISlideProps> {
    const { index, slidesCount } = this.props;
    const inlineStyle = {
      backgroundImage: `url(${this.props.slide.LinkFilename})`,
    };
    return (
      <li
        key={this.props.index}
        style={inlineStyle}
        className={
          this.props.index == this.props.parent.state.activeIndex
            ? [styles.carouselSlide, styles.carouselSlideActive].join(" ")
            : styles.carouselSlide
        }
      >
        <div className={styles.carouselSlideFooter}>
        <Indicators parent={parent} index={index} slidesCount={slidesCount} display={true}/>
        {this.props.wpProps.captionDisplay ? (
          <div className={styles.caption}>
            <div className={styles.captionContent}>
              <span className={styles.captionTitle}>
                {this.props.slide.Title}
              </span>
              <span>{this.props.slide.Caption}</span>
            </div>
          </div>
        ) : undefined}
        </div>
      </li>
    );
  }
}
