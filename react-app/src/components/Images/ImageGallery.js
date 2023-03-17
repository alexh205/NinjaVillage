import React, {useState} from 'react';

const ImageGallery = ({galleryImages, imgDeletion, setImgDeletion}) => {
  const [hideImage, setHideImage] = useState([]);

  const handleDelete = index => {
    const updateImageDeletion = [...imgDeletion, index];
    setImgDeletion(updateImageDeletion);
    setHideImage([...hideImage, index]);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {galleryImages.map((image, index) => (
        <div
          key={image.id}
          className={`${
            hideImage.includes(index)
              ? 'hidden'
              : 'relative mx-2 border-2 border-dashed p-[2px]'
          }`}>
          <button
            onClick={e => {
              e.preventDefault();
              handleDelete(index);
              alert('Be sure to click submit to save changes!');
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
            alt={`${image.id}`}
            className="w-[180px] h-[180px] object-fit"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
