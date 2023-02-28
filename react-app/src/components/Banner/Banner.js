import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
    return (
        <div className="relative pb-10">
            <div
                className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent
            bottom-0 z-20"
            />
            <Carousel
                autoPlay
                infiniteLoop
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                interval={5000}>
                <div>
                    <img
                        loading="lazy"
                        src={
                            "https://ninjastore.s3.amazonaws.com/site_backgrounds/Banner+Images/books.jpg"
                        }
                        alt="first banner"
                    />
                </div>
                <div>
                    <img
                        loading="lazy"
                        src={
                            "https://ninjastore.s3.amazonaws.com/site_backgrounds/Banner+Images/clothe.jpg"
                        }
                        alt="second banner"
                    />
                </div>
                <div>
                    <img
                        loading="lazy"
                        src={
                            "https://ninjastore.s3.amazonaws.com/site_backgrounds/Banner+Images/open.jpg"
                        }
                        alt="third banner"
                    />
                </div>
                <div>
                    <img
                        loading="lazy"
                        src={
                            "https://ninjastore.s3.amazonaws.com/site_backgrounds/Banner+Images/splash.jpg"
                        }
                        alt="four banner"
                    />
                </div>
                <div>
                    <img
                        loading="lazy"
                        src={
                            "https://ninjastore.s3.amazonaws.com/site_backgrounds/Banner+Images/weAreOpen.jpg"
                        }
                        alt="five banner"
                    />
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;
