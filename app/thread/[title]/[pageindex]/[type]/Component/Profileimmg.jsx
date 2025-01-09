import { useState } from 'react';

const ProfileImage = ({ imageUrl, defaultImageUrl }) => {
  const [src, setSrc] = useState(imageUrl);
  return (
    <img
      src={src}
      className='sm:w-16 sm:h-16 lg:w-20 lg:h-20 h-14 w-14 object-cover'
    />
  );
};

export default ProfileImage;
