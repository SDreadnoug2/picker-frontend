import React, { useState } from 'react';
import './ImageCarousel.css';

const ImageCarousel = ({ images }) => {

    const [imageIndex, setImageIndex] = useState(0);
  //. to have a current index with useSelect
    const nextImage = () => setImageIndex((prev) => prev === images.length -1 ? 0 : prev + 1);
    const prevImage = () => setImageIndex((prev) => prev === 0 ? images.length -1 : prev - 1);
  // binding so that onclick on one of the buttons, it goes left, or right.
  // display that index's source as the image source.
   
   return(
    <div className="carousel">
        <button onClick={prevImage} className="carousel__button prev"></button>
        <img src={images[imageIndex]} alt={`Slide ${imageIndex + 1}`} className='carousel__image'/>
        <button onClick={prevImage} className="carousel__button next"></button>
    </div>
   )
};

export default ImageCarousel;