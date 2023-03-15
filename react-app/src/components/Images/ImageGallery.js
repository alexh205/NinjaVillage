import React, {useState} from 'react';

const ImageGallery = ({galleryImages, imgDeletion, setImgDeletion}) => {
  const [hideImage, setHideImage] = useState([]);

  const handleDelete = imageId => {
    const updateImageDeletion = [...imgDeletion, imageId];
    setImgDeletion(updateImageDeletion);
    setHideImage([...hideImage, imageId]);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {galleryImages.map(image => (
        <div
          key={image.id}
          className={`${
            hideImage.includes(image.id)
              ? 'hidden'
              : 'relative mx-2 border-2 border-dashed p-[2px]'
          }`}>
          <button
            onClick={e => {
              e.preventDefault();
              handleDelete(image.id);
            }}
            className={`${
              galleryImages.length === 1
                ? 'hidden'
                : 'absolute top-0 right-0 w-6 h-6 rounded-full bg-red-500 text-white flex justify-center items-center'
            }`}>
            <span>x</span>
          </button>
          <img
            src={image.url}
            alt={`Image ${image.id}`}
            className="w-[200px] h-[200px] object-fit"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
