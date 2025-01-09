"use client";
import React, { useState } from 'react';

const Imagesprofile = ({ src }) => {

  const isUrl = (value) => {
    try {
      new URL(value);
      return true;
    } catch (_) {
      return false;
    }
  };
  const [imageSrc, setImageSrc] = useState(getImageSrc(src));

  // Function to determine if the src is a URL


  // Determine the image source based on the `src` prop
  function getImageSrc(src) {
    if (isUrl(src)) {
      return src;
    }
    switch (src) {
      case '1': return '/profileimage/2.png';
      case '2': return '/profileimage/3.png';
      case '3': return '/profileimage/4.png';
      case '4': return '/profileimage/5.png';
      case '5': return '/profileimage/6.png';
      case '6': return '/profileimage/7.png';
      case '7': return '/profileimage/8.png';
      case '8': return '/profileimage/9.png';
      case '9': return '/profileimage/10.png';
      case '10': return '/profileimage/11.png';
      case '11': return '/profileimage/12.png';
      case '12': return '/profileimage/13.png';
      case '13': return '/profileimage/14.png';
      case '14': return '/profileimage/15.png';
      case '15': return '/profileimage/16.png';
      case '16': return '/profileimage/17.png';
      case '17': return '/profileimage/18.png';
      case '18': return '/profileimage/19.png';
      case '19': return '/profileimage/20.png';
      case '20': return '/profileimage/21.png';
      case '21': return '/profileimage/22.png';
      case '22': return '/profileimage/23.png';
      case '001': return '/profileimage/001.png';
      default: return '/profileimage/1.png';
    }
  }

  const handleImageError = () => {
    setImageSrc('/profileimage/1.png'); // Fallback to default image on error
  };

  return (
    <img
      src={imageSrc}
      className="w-full h-full object-cover"
      onError={handleImageError}
    />
  );
};

export default Imagesprofile;
