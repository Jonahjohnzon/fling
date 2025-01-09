import { useState } from 'react';

const ProfileImage = ({ imageUrl, defaultImageUrl }) => {
  const [src, setSrc] = useState(imageUrl);
  const [load, setload] = useState(true)
  const handleError = () => {
    setload(false)
    setSrc(defaultImageUrl);
    setload(true)
  };

  return (
    <>
    {load?<img
      src={src}
      onError={handleError}
      className='sm:w-16 sm:h-16 lg:w-20 lg:h-20 h-14 w-14 object-cover'
    />:<div className='sm:w-16 sm:h-16 lg:w-20 lg:h-20 h-14 w-14'></div>}</>
  );
};

export default ProfileImage;
