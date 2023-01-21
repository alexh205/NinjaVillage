import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import amazon_banner_1 from '../../Media/Banner Images/amazon_banner_1.jpg'
import amazon_banner_2 from '../../Media/Banner Images/amazon_banner_2.jpg'
import amazon_banner_3 from '../../Media/Banner Images/amazon_banner_3.jpg'
import amazon_banner_4 from '../../Media/Banner Images/amazon_banner_4.jpg'
// import amazon_banner_5 from '../../Media/Banner Images/amazon_banner_5.jpg'
import amazon_banner_6 from '../../Media/Banner Images/amazon_banner_6.jpg'
import amazon_banner_7 from '../../Media/Banner Images/amazon_banner_7.jpg'

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
                    <img loading="lazy" src={amazon_banner_1} alt="first banner" />
                </div>
                <div>
                    <img loading="lazy" src={amazon_banner_2} alt="second banner" />
                </div>
                <div>
                    <img loading="lazy" src={amazon_banner_3} alt="third banner" />
                </div>
                <div>
                    <img loading="lazy" src={amazon_banner_4} alt="four banner" />
                </div>
                {/* <div>
                    <img loading="lazy" src={amazon_banner_5} alt="five banner" />
                </div> */}
                <div>
                    <img loading="lazy" src={amazon_banner_6} alt="six banner" />
                </div>
                <div>
                    <img loading="lazy" src={amazon_banner_7} alt="seven banner" />
                </div>

            </Carousel>
        </div>
    );
};

export default Banner;
