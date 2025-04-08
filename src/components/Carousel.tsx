import * as React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Image, LexicalRichText } from "@yext/pages-components";

export interface CBannerImage {
  clickthroughUrl: string;
  description: string;
  image: Image;
  richTextDescriptionV2: any;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

const Carousel = (props: any) => {
  const { data } = props;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider.default {...settings}>
      {data &&
        data.map((item: CBannerImage, index: any) => (
          <a
            href={item.clickthroughUrl}
            key={index}
            className="flex flex-col gap-2"
          >
            <Image image={item.image} />
            <LexicalRichText
              serializedAST={JSON.stringify(item.richTextDescriptionV2.json)}
            />
          </a>
        ))}
    </Slider.default>
  );
};

export default Carousel;
