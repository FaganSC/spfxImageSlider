import * as React from "react";
import styles from "./ImageSlider.module.scss";
import { IImageSliderProps } from "./IImageSliderProps";
import { IImageSliderState } from "./IImageSliderState";
import { Slide } from "./Slide";
import { StaticImage } from "./StaticImage";
import { SliderImageItems } from "../models/SliderImageItems";
import { ImageSliderService } from "../services/ImageSliderService";

export default class ImageSlider extends React.Component<
  IImageSliderProps,
  IImageSliderState
> {
  private timer;
  constructor(props) {
    super(props);
    this.goToSlide = this.goToSlide.bind(this);
    this.goToPrevSlide = this.goToPrevSlide.bind(this);
    this.goToNextSlide = this.goToNextSlide.bind(this);
    this.onclickNextSlide = this.onclickNextSlide.bind(this);
    this.state = {
      slides: null,
      activeIndex: 0,
      count: 10,
      speed: 10,
      running: true,
    };
  }

  private goToSlide = (index) => {
    this.setState({ activeIndex: index, count: 10, running: false });
  }

  private onclickNextSlide = (e) => {
    e.preventDefault();
    this.goToNextSlide();
  }

  private goToPrevSlide = (e) => {
    e.preventDefault();
    let index = this.state.activeIndex;
    let slidesLength = this.state.slides.length;
    if (index < 1) {
      index = slidesLength;
    }
    --index;
    this.setState({
      activeIndex: index,
      count: this.state.speed,
      running: false,
    });
  }

  private goToNextSlide = () => {
    let index = this.state.activeIndex;
    let slidesLength = this.state.slides.length - 1;

    if (index === slidesLength) {
      index = -1;
    }
    ++index;

    this.setState({
      activeIndex: index,
      count: this.state.speed,
      running: false,
    });
  }

  public componentDidMount = () => {
    ImageSliderService.GetItems(this.props.context)
      .then((spItems: SliderImageItems[]) => {
        this.setState({ slides: spItems });
        if (spItems.length > 1) {
          setInterval(() => {
            let newValue = this.state.count - 1;
            if (newValue >= 0) {
              this.setState({ count: newValue, running: true });
            } else {
              this.goToNextSlide();
            }
          }, 1000);
        }
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  public render(): React.ReactElement<IImageSliderProps> {
    if (this.state.slides === null) {
      return (
        <div className={styles.imageSlider}>
          <h1>Loading</h1>
        </div>
      );
    } else if (this.state.slides.length > 1) {
      return (
        <div className={styles.imageSlider}>
          <div className={styles.carousel}>
            <ul className={styles.carouselSlides}>
              {this.state.slides.map((item: SliderImageItems, index) => (
                <Slide parent={this} index={index} slide={item} />
              ))}
            </ul>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.imageSlider}>
          <StaticImage parent={this} index={0} slide={this.state.slides[0]} />
        </div>
      );
    }
  }
}
