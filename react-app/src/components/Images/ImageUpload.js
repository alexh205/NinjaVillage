import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {getProductThunk} from '../../store/productReducer';

const ImageUpload = ({productId, reviewId}) => {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);

    formData.append('reviewId', reviewId || null);
    formData.append('productId', productId || null);

    setImage(null);

    const res = await fetch('/api/images/new', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      await res.json();
      alert('Image uploaded successfully!');
      await dispatch(getProductThunk(productId));
    } else {
      // server error handling
      console.log('Backend error!');
    }
  };

  const updateImage = e => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div>
      <input type="file" accept="image/*" name="image" onChange={updateImage} />
      <button
        type="submit"
        className="cursor-pointer p-2 font-bold text-[13px] md-text-sm bg-gradient-to-b from-green-300 to-green-500 border-green-400 focus:ring-2 focus:ring-green-600 active:from-green-600 focus:outline-none rounded-sm"
        onClick={handleSubmit}>
        Upload
      </button>
    </div>
  );
};

export default ImageUpload;
