import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import books from '../../Media/Banner Images/books.jpg'
import clothe from '../../Media/Banner Images/clothe.jpg'
import open from '../../Media/Banner Images/open.jpg'
import splash from '../../Media/Banner Images/splash.jpg'
import weAreOpen from '../../Media/Banner Images/weAreOpen.jpg'

const Banner = () => {
    return (
        <div className="relative">
            <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent
            bottom-0 z-20"/>
            <Carousel
                autoPlay
                infiniteLoop
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                interval={5000}>
                <div>
                    <img loading="lazy" src={books} alt="first banner" />
                </div>
                <div>
                    <img loading="lazy" src={clothe} alt="second banner" />
                </div>
                <div>
                    <img loading="lazy" src={open} alt="third banner" />
                </div>
                <div>
                    <img loading="lazy" src={splash} alt="four banner" />
                </div>
                <div>
                    <img loading="lazy" src={weAreOpen} alt="five banner" />
                </div>

            </Carousel>
        </div>
    );
};

export default Banner;
