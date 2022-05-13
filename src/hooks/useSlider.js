import { useState } from 'react';

const useSlider = (sliderRef, numOfSlides) => {
  const [scrollStart, setScrollStart] = useState(true);
  const [scrollEnd, setScrollEnd] = useState(false);

  const sliderScrollHandler = () => {
    // scroll start
    sliderRef.current.scrollLeft === 0
      ? setScrollStart(true)
      : setScrollStart(false);

    // scroll end
    Math.round(sliderRef.current.scrollWidth - sliderRef.current.scrollLeft) <=
      sliderRef.current.clientWidth + 1 &&
    Math.round(sliderRef.current.scrollWidth - sliderRef.current.scrollLeft) >=
      sliderRef.current.clientWidth - 1
      ? setScrollEnd(true)
      : setScrollEnd(false);
  };

  const sliderClickHandler = direction => {
    const scrollAmount = sliderRef.current?.scrollWidth / numOfSlides;

    if (direction === 'next') {
      sliderRef.current.scrollTo({
        left: sliderRef.current.scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    } else {
      sliderRef.current.scrollTo({
        left: sliderRef.current.scrollLeft - scrollAmount,
        behavior: 'smooth',
      });
    }
  };
  return { scrollStart, scrollEnd, sliderScrollHandler, sliderClickHandler };
};

export default useSlider;
