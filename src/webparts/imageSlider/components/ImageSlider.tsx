import * as React from "react";
import styles from "./ImageSlider.module.scss";
import { IImageSliderProps } from "./IImageSliderProps";
import { IImageSliderState } from "./IImageSliderState";
import { Slide } from "./Slide";
import { StaticImage } from "./StaticImage";
import { SliderImageItems } from "../models/SliderImageItems";
import { ImageSliderService } from "../services/ImageSliderService";
import * as moment from "moment";
export default class ImageSlider extends React.Component<
  IImageSliderProps,
  IImageSliderState
> {
  private timer: number | undefined;
  constructor(props) {
    super(props);
    this.getImages = this.getImages.bind(this);
    this.goToSlide = this.goToSlide.bind(this);
    this.goToPrevSlide = this.goToPrevSlide.bind(this);
    this.goToNextSlide = this.goToNextSlide.bind(this);
    this.onclickNextSlide = this.onclickNextSlide.bind(this);
    this.onclickPrevSlide = this.onclickPrevSlide.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.state = {
      slides: null,
      activeIndex: 0,
      speed: this.props.slideSpeed,
      running: true,
    };
  }

  /**
   * Handles action to go to a selected slide.
   */
  private goToSlide = (index) => {
    this.setState({ activeIndex: index, running: false });
  }

  /**
   * Handles onclick to go to the next slide.
   */
  private onclickPrevSlide = (e) => {
    e.preventDefault();
    this.goToPrevSlide(e);
  }

  /**
   * Handles onclick to go to the next slide.
   */
  private onclickNextSlide = (e) => {
    e.preventDefault();
    this.goToNextSlide();
  }

  /**
   * Handles action to go to the pervious slide.
   */
  private goToPrevSlide = (e) => {
    const { activeIndex, slides } = this.state;
    e.preventDefault();
    let index = activeIndex;
    let slidesLength = slides.length;
    if (index < 1) {
      index = slidesLength;
    }
    --index;
    this.setState({
      activeIndex: index,
      running: false,
    });
  }

  /**
   * Handles action to go to the next slide.
   */
  private goToNextSlide = () => {
    const { activeIndex, slides, speed } = this.state;
    let index = activeIndex;
    let slidesLength = slides.length - 1;

    if (index === slidesLength) {
      index = -1;
    }
    ++index;

    this.setState({
      activeIndex: index,
      running: false,
    });
  }

  /**
   * Function get the images from the SharePoint list.
   */
  private getImages = () => {
    const { context, displayView } = this.props;
    ImageSliderService.GetItems(context, displayView)
      .then((spItems: SliderImageItems[]) => {
        this.setState({ slides: spItems });
        if (spItems.length > 1) {
          this.startTimer();
        }
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  /**
   * Handles the start of the slider timer.
   * @param newInterval
   */
  private startTimer = (newInterval?: number) => {
    const { activeIndex, speed } = this.state;
    var interval: number = newInterval !== undefined ? newInterval : speed;
    this.timer = setInterval(() => {
      let newValue = activeIndex - 1;
      if (newValue >= 0) {
        this.setState({ activeIndex: newValue, running: true });
      } else {
        this.goToNextSlide();
      }
    }, interval);
  }

  /**
   * Handles component mount lifecycle method.
   */
  public componentDidMount = () => {
    //Get Sites from SharePoint Library on Web Part Mount
    this.getImages();
  }

  /**
   * Handles component update lifecycle method.
   * @param prevProps
   */
  public componentDidUpdate(prevProps: IImageSliderProps) {
    const currProps = this.props;
    if (prevProps.displayView !== currProps.displayView) {
      //clearInterval(this.timer);
      this.getImages();
    }
    if (prevProps.slideSpeed !== currProps.slideSpeed) {
      this.setState({
        activeIndex: 0,
        speed: currProps.slideSpeed,
      });
      //clearInterval(this.timer);
      this.startTimer(currProps.slideSpeed);
    }
  }

  /**
   * Handles component render.
   * @param prevProps
   */
  public render(): React.ReactElement<IImageSliderProps> {
    const { slides } = this.state;
    if (slides === null) {
      return (
        <div className={styles.imageSlider}>
          <h1>Loading</h1>
        </div>
      );
    } else if (slides.length > 1) {
      return (
        <div className={styles.imageSlider}>
          <div className={styles.carousel}>
            <ul className={styles.carouselSlides}>
              {slides.map((item: SliderImageItems, index) => (
                <Slide parent={this} index={index} slide={item} />
              ))}
            </ul>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.imageSlider}>
          <StaticImage parent={this} index={0} slide={slides[0]} />
        </div>
      );
    }
  }
}
