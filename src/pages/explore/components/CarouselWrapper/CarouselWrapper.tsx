import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

const CarouselWrapper = ({ slides }: { slides: Array<JSX.Element> }) => {
  return (
    <>
      {slides?.length ? (
        <Swiper
          loop={true}
          autoplay={{ delay: 8000, disableOnInteraction: true }}
          pagination={{ dynamicBullets: true, clickable: true }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i + 'explore_slides'}>{slide}</SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <></>
      )}
    </>
  );
};
export default CarouselWrapper;
