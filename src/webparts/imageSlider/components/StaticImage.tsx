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

export class StaticImage extends React.Component<ISlideProps, ISlideState> {
    constructor(props) {
        super(props);
    }

    public render(): React.ReactElement<ISlideProps> {
        const inlineStyle = { backgroundImage: `url(${this.props.slide.LinkFilename})`};
        if (this.props.slide.ImgSliderLink !== null){
            return (
                <a href={this.props.slide.ImgSliderLink} >
                    <div className={styles.staticImage } style={inlineStyle}>&nbsp;</div>
                </a>
            );
        } else {
            return (
                <div className={styles.staticImage } style={inlineStyle}>&nbsp;</div>
            );
        }        
    }
}
