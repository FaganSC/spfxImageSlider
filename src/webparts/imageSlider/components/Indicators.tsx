import * as React from "react";
import styles from "./ImageSlider.module.scss";
import { SliderImageItems } from "../models/SliderImageItems";
export interface IIndicatorsProps {
  parent: any;
  index: number;
  display: boolean;
  slidesCount: number;
}

export interface IIndicatorsState {}

export class Indicators extends React.Component<
  IIndicatorsProps,
  IIndicatorsState
> {
  constructor(props) {
    super(props);
    this.getIndicators = this.getIndicators.bind(this);
  }

  private getIndicators = () => {
    const { display, slidesCount, index : slideItem } = this.props;
    const indicatorsElem: JSX.Element[] = [];
    if (display) {
      for (let i = 0; i < slidesCount; i++) {
        indicatorsElem.push(<li className={slideItem === i ? styles.active : undefined } onClick={()=>this.props.parent.goToSlide(i)}></li>);
      }
    }
    return <ol className={[styles.indicators, styles.rectangle, styles.themeWhite, styles.postionBottom].join(' ')}>{indicatorsElem}</ol>;
  }

  public render(): React.ReactElement<IIndicatorsProps> {
    const { display } = this.props;
    if (display) {
      return this.getIndicators();
    } else {
      return undefined;
    }
  }
}
