import * as React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Image, LexicalRichText } from "@yext/pages-components";

export interface Root2 {
  c_bannerImage: CBannerImage;
  richTextDescriptionV2: any;
}

export interface CBannerImage {
  clickthroughUrl: string;
  description: string;
  image: Image;
}

export interface Image {
  alternateText: string;
  height: number;
  url: string;
  width: number;
}

const Carousel = (props: any) => {
  const { data } = props;
  console.log(JSON.stringify(data) + "------");

  //@ts-ignore
  const SliderComponent = Slider.default || Slider;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 50,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 50,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 50,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 50,
        },
      },
    ],
  };
  return (
    <SliderComponent {...settings}>
      {data &&
        data.map((item: Root2, index: any) => (
          <a
            href={item.c_bannerImage.clickthroughUrl}
            key={index}
            className="flex flex-col gap-2"
          >
            <Image image={item.c_bannerImage} />
            <LexicalRichText
              serializedAST={JSON.stringify(item.richTextDescriptionV2.json)}
            />
          </a>
        ))}
    </SliderComponent>
  );
};

export default Carousel;
