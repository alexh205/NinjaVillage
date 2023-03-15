import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
// import Loading from "./Loading";

const ImageUpload = ({productId, reviewId}) => {
  const history = useHistory();
  const [image, setImage] = useState(null);
  // const [hasClicked, setHasClicked] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);

    formData.append('reviewId', reviewId);
    formData.append('productId', productId);

    // setHasClicked(true);

    const res = await fetch('/api/images/new', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      await res.json();
      console.log('res obj', res);
      history.push(`/${reviewId}`);
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
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*" name="image" onChange={updateImage} />
      <button type="submit" className="button">
        Submit
      </button>
    </form>
  );
};

export default ImageUpload;
