import { useState } from "react";

const slideStyles = {
  width: "100%",
  height: "100%",
  borderRadius: "10px",
  objectFit: "center",
};

const rightArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  right: "32px",
  color: "#fff",
  fontSize: "45px",
  zIndex: 1,
  cursor: "pointer",
};

const leftArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  left: "32px",
  color: "#fff",
  fontSize: "45px",
  zIndex: 1,
  cursor: "pointer",
};

const sliderStyles = {
  position: "relative",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const dotsContainerStyles = {
  display: "flex",
  justifyContent: "center",
  marginTop: "10px",
};

const dotStyle = {
  margin: "0 3px",
  cursor: "pointer",
  fontSize: "20px",
};

const ImageSlider = ({ slides, captions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(captions);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <>
      <div style={sliderStyles}>
        <div
          onClick={goToPrevious}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              goToPrevious();
            }
          }}
          tabIndex="0"
          role="button"
          style={leftArrowStyles}
        >
          ❰
        </div>
        <img src={slides[currentIndex]} alt={captions[currentIndex]} style={slideStyles} />
        <div
          onClick={goToNext}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              goToNext();
            }
          }}
          tabIndex="0"
          role="button"
          style={rightArrowStyles}
        >
          ❱
        </div>
      </div>
      <div style={dotsContainerStyles}>
        {slides.map((slide, slideIndex) => (
          <div
            style={dotStyle}
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                goToSlide(slideIndex);
              }
            }}
            tabIndex="0"
            role="button"
          >
            ●
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageSlider;
