import React, { useState, useContext, useEffect } from "react";
import "./ImageCarousel.css";
import isLoadingContext from "../../contexts/isLoadingContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
const ImageCarousel = ({images}) => {
  const [imageIndex, setImageIndex] = useState(0);
  const {isLoading, setIsLoading} = useContext(isLoadingContext);

  
  const nextImage = () =>{
    setImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }
  const prevImage = () => {
    setImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }
/*
  useEffect(() => {
    console.log("images changed")
    setIsLoading(true);
    const promises = images.map(src => {
      return new Promise(resolve => {
        const img = new Image();
        img.onload = resolve
        img.src = src;
      });
    })

    Promise.all(promises).then(() => (setIsLoading(false)));
  },[images]);
*/
  console.log(isLoading);

  if(isLoading){
    return (
      <span className="loading">Loading<span>.</span><span>.</span><span>.</span></span>
    )
  }


  return (
    <div className="carousel">
      <FontAwesomeIcon onClick={prevImage} className="carousel__button prev" icon={faArrowLeft} />
      <div className="carousel__images_container">
        <img
          src={images[imageIndex]}
          alt={`Slide ${imageIndex + 1}`}
          className="carousel__image"
        />
      </div>
      <FontAwesomeIcon onClick={nextImage} className="carousel__button next" icon={faArrowLeft} />
    </div>
  );
};

export default ImageCarousel;
