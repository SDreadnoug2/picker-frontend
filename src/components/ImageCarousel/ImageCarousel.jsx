import React, { useState, useContext, useEffect } from "react";
import "./ImageCarousel.css";
import isLoadingContext from "../../contexts/isLoadingContext";

const ImageCarousel = ({images}) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const {setIsLoading} = useContext(isLoadingContext);
  //. to have a current index with useSelect
  const nextImage = () =>{
    setImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setDirection("right");
  }

  const prevImage = () => {
    setImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setDirection("left");
  }


  return (
    <div className="carousel">
      <button onClick={prevImage} className="carousel__button prev"></button>
      <img
        src={images[imageIndex]}
        alt={`Slide ${imageIndex + 1}`}
        className={(direction === "right") ? "carousel__image slide_right": "carousel__image slide_left"}
      />
      <button onClick={nextImage} className="carousel__button next"></button>
    </div>
  );
};

export default ImageCarousel;
