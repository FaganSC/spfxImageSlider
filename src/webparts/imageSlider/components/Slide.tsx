import * as React from 'react';
import { SliderImageItems } from '../models/SliderImageItems';
import styles from './ImageSlider.module.scss';

export interface ISlideProps {
    parent: any;
    index: number;
    slide: SliderImageItems;
}

export interface ISlideState {
}

export class Slide extends React.Component<ISlideProps, ISlideState> {
    constructor(props) {
        super(props);
    }

    public render(): React.ReactElement<ISlideProps> {
        const inlineStyle = { backgroundImage: `url(${this.props.slide.LinkFilename})`};
        return (
            <li key={this.props.index} style={inlineStyle}
                className={ this.props.index == this.props.parent.state.activeIndex ? [styles.carouselSlide, styles.carouselSlideActive].join(' ') : styles.carouselSlide } >
              </li>
        );
    }
}
