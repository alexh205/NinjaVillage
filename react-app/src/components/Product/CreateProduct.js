import React, {useState} from "react";
import Header from "../Header/Header";
import {
    getAllProductThunk,
    createProductThunk,
} from "../../store/productReducer";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const CreateProduct = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [image, setImage] = useState("");
    const [count, setCount] = useState('');

    const [validateErrors, setValidateErrors] = useState([]);

    const validate = () => {
        const errors = [];

        if (!title) errors.push("Please provide a 'Title'");
        if (!price) errors.push("Please provide a 'Price'");
        if (!description) errors.push("Please provide a 'Description'");
        if (!category) errors.push("Please select a 'Category'");
        if (!brand) errors.push("Please provide a 'Brand'");
        if (!image) errors.push("Please provide a 'Image'");
        if (!count) errors.push("Please provide a starting 'Inventory' number");

        return errors;
      }

    const onProductCreate = async e => {
        e.preventDefault();
        const errors = validate();

        if (errors.length > 0) return setValidateErrors(errors);

       const product= await dispatch(
            createProductThunk(
                title,
                price,
                description,
                category,
                brand,
                image,
                count
            )
        );

        await dispatch(getAllProductThunk());

        setTitle('')
        setPrice('')
        setDescription('')
        setCategory('')
        setBrand('')
        setImage('')
        setCount('')
        setValidateErrors([])
   
        history.push(`/products/${product.id}`);
    };

    return (
        <div>
            <Header />
            <div className="flex flex-col mt-6 mx-10 border-b">
                <h1 className="font-bold text-3xl">Create a Listing</h1>
                {validateErrors.length > 0 && (
                <div className="my-2 ml-2">
                <h3 className="font-bold text-[16px] ">The following errors were found:</h3>
                <ul className='text-red-600 text-[13px] font-semibold ml-2'>
                    {validateErrors.map(error => <li key={error}>{error}</li>)}
                </ul>
                </div>
                )}
            </div>
            <form className="mt-4 mx-10">
                <div className="mt-3 flex flex-col border-b">
                    <label className="font-bold text-xl my-1">Title</label>
                    <input
                        className="flex self-start mb-6 p-1 text-left border-[2px] rounded-sm"
                        type="text"
                        size="57"
                        maxLength="50"
                        name="title"
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                        required={true}></input>
                </div>

                <div className="mt-3 flex flex-col border-b">
                    <label className="font-bold text-xl my-1">Price</label>
                    <input
                        className="flex self-start mb-6 p-1 text-left border-[2px] rounded-sm"
                        type="text"
                        size="57"
                        maxLength="50"
                        name="price"
                        onChange={e => setPrice(e.target.value)}
                        value={price}
                        required={true}></input>
                </div>

                <div className="mt-3 flex flex-col border-b">
                    <label className="font-bold text-xl my-1">
                        Description
                    </label>
                    <textarea
                        className="mb-6 border-[2px] p-2 rounded-sm"
                        rows="4"
                        maxLength="300"
                        name="description"
                        onChange={e => setDescription(e.target.value)}
                        value={description}></textarea>
                </div>

                <div className="mt-3 flex flex-col border-b">
                    <label className="font-bold text-xl my-1">Category</label>
                    <select
                        className="flex self-start mb-6 p-1 text-left border-[2px] rounded-sm"
                        name="category"
                        onChange={e => setCategory(e.target.value)}
                        value={category}>
                         <option value="">--Please choose a category--</option>
                        <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                        <option value="Books">Books</option>
                        <option value="Clothing, Shoes & Jewelry">Clothing, Shoes & Jewelry</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Groceries">Groceries</option>
                        <option value="Health & Household">Health & Household</option>
                        <option value="Pet Supplies">Pet Supplies</option>
                        <option value="Video Games">Video Games</option>
                    </select>
                </div>

                <div className="mt-3 flex flex-col border-b">
                    <label className="font-bold text-xl my-1">Brand</label>
                    <input
                        className="flex self-start mb-6 p-1 text-left border-[2px] rounded-sm"
                        type="text"
                        size="57"
                        maxLength="50"
                        name="brand"
                        onChange={e => setBrand(e.target.value)}
                        value={brand}
                        required={true}></input>
                </div>

                <div className="mt-3 flex flex-col border-b">
                    <label className="font-bold text-xl my-1">Image url</label>
                    <input
                        className="flex self-start mb-6 p-1 text-left border-[2px] rounded-sm"
                        type="url"
                        size="80"
                        maxLength="50"
                        name="image"
                        onChange={e => setImage(e.target.value)}
                        value={image}
                        required={true}></input>
                </div>

                <div className="mt-3 flex flex-col border-b">
                    <label className="font-bold text-xl my-1">Inventory</label>
                    <input
                        className="flex self-start mb-6 p-1 text-left border-[2px] rounded-sm"
                        type="number"

                        name="count"
                        onChange={e => setCount(e.target.value)}
                        value={count}
                        required={true}></input>
                </div>

                <div className="flex flex-row mt-5 justify-end">
                    <button
                        className="button"
                        onClick={e => {
                            history.push('/');
                        }}>
                        Cancel
                    </button>
                    <button
                        className="button ml-10"
                        onClick={e => {
                            onProductCreate(e);

                        }}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateProduct;
