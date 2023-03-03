import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Loading from "./Loading";

const ImageUpload = ({ productId, reviewId }) => {
    const history = useHistory();
    const [image, setImage] = useState(null);
    const [hasClicked, setHasClicked] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);

        formData.append("reviewId", reviewId);
        formData.append("productId", productId);
        
        // aws uploads can be a bit slow—displaying
        setHasClicked(true);

        const res = await fetch("/api/images/new", {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            await res.json();
            setHasClicked(false);
            history.push(`/${reviewId}`);
        } else {
            setHasClicked(false);
            // error handling
            console.log("Backend error!");
        }
    };

    const updateImage = e => {
        const file = e.target.files[0];
        setImage(file);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="file"
                accept="image/*"
                name="image"
                onChange={updateImage}
            />
            <button type="submit" className="button">
                Submit
            </button>
            {hasClicked && <Loading />}
        </form>
    );
};

export default ImageUpload;
