import * as React from "react";
import { SliderImageItems } from "../models/SliderImageItems";
import styles from "./ImageSlider.module.scss";
import { IImageSliderProps } from "./IImageSliderProps";
export interface ISlideProps {
  parent: any;
  index: number;
  slide: SliderImageItems;
  wpProps: IImageSliderProps;
}

export interface ISlideState {}

export class StaticImage extends React.Component<ISlideProps, ISlideState> {
  constructor(props) {
    super(props);
  }

  public render(): React.ReactElement<ISlideProps> {
    const { slide } = this.props;
    const inlineStyle = { backgroundImage: `url(${slide.LinkFilename})` };
    if (slide.ImgSliderLink !== null) {
      return (
        <a
          href={slide.ImgSliderLink}
          target={slide.ImgSliderNewTab ? "_blank" : "_self"}
        >
          <div className={styles.staticImage} style={inlineStyle}>
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
        </a>
      );
    } else {
      return (
        <div className={styles.staticImage} style={inlineStyle}>
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
      );
    }
  }
}
