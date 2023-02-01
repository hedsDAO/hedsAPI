import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box } from '@chakra-ui/react';

const CarouselWrapper = ({ slides }: { slides?: Array<JSX.Element> }) => {
  var settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 1000,
    pauseOnHover: true, 
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Box data-testid="explore-wrapper" pb={10}>
      {slides?.length ? (
        <Slider {...settings}>
          {slides.map((slide, i) => (
            <div key={i}>{slide}</div>
          ))}
        </Slider>
      ) : (
        <></>
      )}
    </Box>
  );
};
export default CarouselWrapper;
