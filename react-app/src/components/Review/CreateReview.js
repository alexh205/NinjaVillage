import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'
import Header from '../Header/Header'
import { createReviewThunk,getAllProductThunk } from '../../store/productReducer'

const CreateReview = () => {
  const {productId} = useParams()
  const dispatch = useDispatch()
  const history = useHistory()

  const [title, setTitle] = useState('')
  const [review, setReview] = useState('')
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  const [validateErrors, setValidateErrors] = useState([]);

  const user = useSelector(state => state.session.user);
  const product = useSelector(state => state.productStore.products[productId])

  const validate = () => {
        const errors = [];

        if (!title) errors.push("Please provide a 'Title'");
        if (!review) errors.push("Please provide a 'Review'");
        // if (!rating) errors.push("Please provide a 'Rating'");

        return errors;
      }


  const onReviewCreation = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (errors.length > 0) return setValidateErrors(errors);


    const owner_id= user.id
    const product_id= product.id

    await dispatch(createReviewThunk(title, review, rating, owner_id, product_id))

    await dispatch(getAllProductThunk())


    setTitle('')
    setReview('')
    // setRating(0)
    // setHover(0)
    setValidateErrors([])
  }

  return (
    <>
    <Header />
    <div className='inline-flex flex-col mr-[610px] lg:flex  ml-[80px]'>
      <div className='flex flex-col mt-8 border-b'>
        <h1 className='font-bold text-3xl'>Create a Review</h1>

        {validateErrors.length > 0 && (
                <div className="my-2 ml-2">
                  <h3 className="font-bold text-[16px] ">The following errors were found:</h3>
                  <ul className='text-red-600 text-[13px] font-semibold ml-2'>
                    {validateErrors.map(error => <li key={error}>{error}</li>)}
                  </ul>
                </div>
                )}
        {product && (<div className='flex flex-row items-center my-5'>
         <img src={product.image} alt='' className="w-[60px] h-[70px] mr-4"></img>
          <div className='sm:line-clamp-4'>{product.title}</div>
          </div>)}

        </div>
      <form className='mt-6'>

        <div className='flex flex-row items-center justify-between mb-3 ml-1'>
          <h1 className='font-bold text-xl '>Overall Rating</h1>
          <p className=' cursor-pointer text-teal-700 text-sm' onClick={() => {
             setRating(1)
             setHover(1)
          }}>Clear</p>
        </div>

        <div className='border-b'>
          <div className='flex flex-row mb-5'>
          {[...Array(5)].map((star, i)=> {
            const ratingValue = i + 1;
            return( <label>
              <input
              key={i}
              className='hidden'
              type='radio'
              name='rating'
              value={ratingValue}
              required={true}
              onClick={()=> setRating(ratingValue)}
              />
                <FaStar size={40} color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={()=> setHover(ratingValue)}
              onMouseLeave={()=> setHover('')}/>
              </label>
           )
            })}
            </div>
        </div>
        <div className='mt-3 flex flex-col border-b'>
          <label className='font-bold text-xl my-4'>Add a title</label>
          <input className='flex self-start mb-6 p-1 text-left border-[2px] rounded-sm' type='text' size='57' maxLength='50'
          name='title' onChange={e => setTitle(e.target.value)}
          value={title} required={true}
          placeholder='The most important point'>
          </input>
        </div>

        <div className='border-b flex flex-col'>
          <label className='font-bold text-xl my-4'>Add a review</label>
          <textarea className='mb-6 mx-42 border-[2px] p-2 rounded-sm' rows='6' maxLength='400'
          name='review' onChange={e => setReview(e.target.value)}
          value={review} required={true}
          placeholder='What did you use the product for? What did you like and dislike?'>
          </textarea>
        </div>
        <div className='flex flex-row mt-5 justify-end'>
          <button className='button' onClick={e => {
            setTitle('')
            setReview('')
            setRating(0)
            history.push(`/products/${productId}`)
            }}>Cancel</button>
          <button className='button ml-10' onClick={e => {
            onReviewCreation(e)
            // history.push(`/products/${productId}`)
          }}>Submit</button>
        </div>
      </form>
    </div>
    </>
  )
}

export default CreateReview
