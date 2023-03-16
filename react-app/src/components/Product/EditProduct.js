import React, {useState} from 'react';
import Header from '../Header/Header';
import {useSelector, useDispatch} from 'react-redux';
import {useParams, useHistory} from 'react-router-dom';
import {
  getAllProductThunk,
  editProductThunk,
  deleteImageThunk,
} from '../../store/productReducer';
import Loading from '../Loading';
import ImageGallery from '../Images/ImageGallery';
import ImageUpload from '../Images/ImageUpload';

const EditProduct = () => {
  const {productId} = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [valid, setValid] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

  const [validateErrors, setValidateErrors] = useState([]);

  const product = useSelector(state => state.productStore.products[productId]);

  const [imgDeletion, setImgDeletion] = useState([]);
  const [galleryImages, setGalleryImages] = useState([
    ...product.productImages,
  ]);

  const productImageArr = product.productImages;

  const validate = () => {
    const errors = [];

    if (!title) errors.push("Please provide a 'Title'");
    if (!price) errors.push("Please provide a 'Price'");
    if (!description) errors.push("Please provide a 'Description'");
    if (!category) errors.push("Please select a 'Category'");
    if (!brand) errors.push("Please provide a 'Brand'");

    return errors;
  };

  if (product) {
    if (!valid) {
      setTitle(product.title);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setBrand(product.brand);
      setValid(true);
    }

    const onProductEdit = async e => {
      e.preventDefault();

      const errors = validate();

      if (errors.length > 0) return setValidateErrors(errors);
      const updatedGalleryImages = galleryImages.filter(
        (_, index) => !imgDeletion.includes(index)
      );
      setGalleryImages(updatedGalleryImages);

      imgDeletion.map(async index => {
        const imageId = productImageArr[index].id;

        await dispatch(deleteImageThunk(imageId, Number(productId)));
      });

      setImgDeletion([]);
      setHasClicked(true);

      const updatedProduct = await dispatch(
        editProductThunk(title, price, description, category, brand, productId)
      );
      setTitle('');
      setPrice('');
      setDescription('');
      setCategory('');
      setBrand('');
      setValid(false);
      setValidateErrors([]);

      await dispatch(getAllProductThunk());

      setHasClicked(false);

      history.push(`/products/${updatedProduct.id}`);
    };

    return (
      <div>
        <Header />
        <div className="flex flex-col mt-6 mx-10 border-b">
          <h1 className="font-bold text-3xl">Edit Listing</h1>
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
          {product && (
            <div className="flex flex-row items-center my-5">
              <img
                src={
                  productImageArr.length > 0 ? productImageArr[0].url : 'image'
                }
                alt="product"
                className="w-[120px] h-[120px] mr-4"></img>
              <div className="sm:line-clamp-4">{product.title}</div>
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
            <label className="font-bold text-xl my-1">Description</label>
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
              size="57"
              maxLength="50"
              name="brand"
              onChange={e => setBrand(e.target.value)}
              value={brand}
              required={true}></input>
          </div>
          <div className="flex flex-col items-center justify-center mt-2">
            <h3 className="text-2xl font-bold">Images</h3>

            <div className="flex flex-row justify-start items-center my-4">
              <ImageGallery
                product={product}
                imgDeletion={imgDeletion}
                setImgDeletion={setImgDeletion}
                galleryImages={galleryImages}
              />
            </div>
            <div>
              {productImageArr.length < 5 ? (
                <ImageUpload productId={productId} />
              ) : null}
            </div>
          </div>
          <div className="flex flex-row mt-5 justify-end mb-6 mr-4 sm:mr-20">
            <button
              className="button"
              onClick={e => {
                history.push(`/products/${productId}`);
              }}>
              Cancel
            </button>
            {hasClicked && <Loading />}
            <button
              className="button ml-2 sm:ml-10"
              disabled={hasClicked}
              onClick={e => {
                onProductEdit(e);
              }}>
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return <Loading />;
  }
};

export default EditProduct;
