import React, {useState} from 'react';
import Header from '../Header/Header';
import {
  getAllProductThunk,
  createProductThunk,
} from '../../store/productReducer';
import {authenticate} from '../../store/sessionReducer';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Loading from '../Loading';

const CreateProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [image, setImage] = useState('');
  const [hasClicked, setHasClicked] = useState(false);

  const [validateErrors, setValidateErrors] = useState([]);

  const validate = () => {
    const errors = [];

    if (!title) errors.push("Please provide a 'Title'");
    if (!price) errors.push("Please provide a 'Price'");
    if (!description) errors.push("Please provide a 'Description'");
    if (!category) errors.push("Please select a 'Category'");
    if (!brand) errors.push("Please provide a 'Brand'");
    if (!image) errors.push("Please provide a 'Image'");

    return errors;
  };

  const onProductCreate = async e => {
    e.preventDefault();

    const errors = validate();

    if (errors.length > 0) {
      return setValidateErrors(errors);
    }

    setHasClicked(true);
    let product;
    try {
      product = await dispatch(
        createProductThunk(title, price, description, category, brand, image)
      );
    } catch (error) {
      console.log(error);
    } finally {
      setTitle('');
      setPrice('');
      setDescription('');
      setCategory('');
      setBrand('');
      setImage('');
      setValidateErrors([]);

      await dispatch(getAllProductThunk());
      await dispatch(authenticate());

      setHasClicked(false);

      history.push(`/products/${product.id}`);
    }
  };

  return (
    <div>
      <Header />
      <div className="mx-4 md:mx-40">
        <div className="flex flex-col mt-6 mx-10 border-b">
          <h1 className="font-bold text-4xl text-ninja_green mb-2">
            Create a Listing
          </h1>
          {validateErrors.length > 0 && (
            <div className="my-2 ml-2">
              <h3 className="font-bold text-[16px] ">
                The following errors were found:
              </h3>
              <ul className="text-red-600 text-[13px] font-semibold ml-2">
                {validateErrors.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
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
              size="40"
              maxLength="90"
              name="title"
              onChange={e => setTitle(e.target.value)}
              value={title}
              placeholder="Product Name"
              required={true}></input>
          </div>

          <div className="mt-3 flex flex-col border-b">
            <label className="font-bold text-xl my-1">Price</label>
            <input
              className="flex self-start mb-6 p-1 text-left border-[2px] rounded-sm"
              type="text"
              size="20"
              name="price"
              onChange={e => setPrice(e.target.value)}
              value={price}
              placeholder="12.50"
              required={true}></input>
          </div>

          <div className="mt-3 flex flex-col border-b">
            <label className="font-bold text-xl my-1">Description</label>
            <textarea
              className="mb-6 border-[2px] p-2 rounded-sm"
              rows="4"
              maxLength="1000"
              name="description"
              onChange={e => setDescription(e.target.value)}
              value={description}
              placeholder="Top of the line cheese maker"></textarea>
          </div>

          <div className="mt-3 flex flex-col border-b">
            <label className="font-bold text-xl my-1">Category</label>
            <select
              className="flex self-start mb-6 p-1 text-left border-[2px] rounded-sm"
              name="category"
              onChange={e => setCategory(e.target.value)}
              value={category}>
              <option value="">--Please choose a category--</option>
              <option value="Beauty & Personal Care">
                Beauty & Personal Care
              </option>
              <option value="Books">Books</option>
              <option value="Clothing, Shoes & Jewelry">
                Clothing, Shoes & Jewelry
              </option>
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
              size="30"
              maxLength="60"
              name="brand"
              onChange={e => setBrand(e.target.value)}
              value={brand}
              placeholder="The best company"
              required={true}></input>
          </div>
          <div className="mt-3 flex flex-col border-b">
            <label className="font-bold text-xl my-1">Image url</label>
            <input
              className="flex self-start mb-6 p-1 text-left border-[2px] rounded-sm"
              type="url"
              size="50"
              maxLength="500"
              name="image"
              onChange={e => setImage(e.target.value)}
              value={image}
              placeholder="https://www.images.com"
              required={true}></input>
          </div>

          <div className="flex flex-row mt-5 mb-4 justify-end">
            <button
              className="button"
              onClick={e => {
                history.push('/');
              }}>
              Cancel
            </button>
            {hasClicked && <Loading />}
            <button
              className="button ml-2 sm:ml-10"
              disabled={hasClicked}
              onClick={e => {
                onProductCreate(e);
              }}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
