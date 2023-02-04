import React, {useState} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { editUserThunk, getUserThunk } from '../../store/sessionReducer'
import Header from '../Header/Header'
import states from '../../Media/states.json'

const EditProfile = () => {
    const {userId} = useParams()
    const user = useSelector(state => state.session.user)

    const dispatch = useDispatch()
    const history = useHistory()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [profileImg, setProfileImg] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const [valid, setValid] = useState(false)

    const [validateErrors, setValidateErrors] = useState([]);



    if (user){
        if(!valid){
        setUsername(user.username)
        setEmail(user.email)
        setName(user.name)
        setStreetAddress(user.street_address)
        setCity(user.city)
        setState(user.state)
        setZipCode(user.zip_code)
        setProfileImg(user.profileImage)
        setValid(true)
    }


    const validate = () => {
        const errors = [];

        if (!username) errors.push("Please provide a 'Username'");
        if (!email) errors.push("Please provide a 'Email'");
        if (!name) errors.push("Please provide a 'Name'");
        if (!streetAddress) errors.push("Please select a 'Street Address'");
        if (!city) errors.push("Please provide a 'City'");
        if (!state) errors.push("Please provide a 'State'");
        if (!zipCode) errors.push("Please provide a 'Zip Code' number");
        if (!profileImg) errors.push("Please provide a 'Profile Image' url");

        return errors;
      }

    const onProfileEdit = async e => {
        e.preventDefault();
        const errors = validate();

        if (errors.length > 0) return setValidateErrors(errors);

        setUsername('')
        setEmail('')
        setName('')
        setStreetAddress('')
        setCity('')
        setState('')
        setZipCode('')
        setProfileImg('')
        setPassword('')
        setRepeatPassword('')
        setValidateErrors([])


        await dispatch(
            editUserThunk(username,email, name, streetAddress, city, state, zipCode,profileImg, password, userId)
        );
    };



  return (
      <div>
        <Header />
        {console.log('test')}
        <div className="flex flex-col mt-6 mx-10 border-b">
                <h1 className="font-bold text-3xl">Edit Profile</h1>
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
                  <label className="font-bold text-xl my-1">
                      UserName
                  </label>
                  <input
                      className="flex self-start mb-6 p-1 text-left border-[2px] rounded-sm"
                      type="text"
                      size="57"
                      maxLength="50"
                      name="username"
                      onChange={e => setUsername(e.target.value)}
                      value={username}
                      ></input>
              </div>

              <div className="mt-3 flex flex-col border-b">
                  <label className="font-bold text-xl my-1">
                      name
                  </label>
                  <input
                      className="flex self-start mb-6 p-1 text-left border-[2px] rounded-sm"
                      type="text"
                      size="57"
                      maxLength="50"
                      name="name"
                      onChange={e => setName(e.target.value)}
                      value={name}
                      ></input>
              </div>

              <div className="mt-3 flex flex-col border-b">
                  <label className="font-bold text-xl my-1">
                      Email
                  </label>
                  <input
                      className="flex self-start mb-6 p-1 text-left border-[2px] rounded-sm"
                      type="text"
                      size="57"
                      maxLength="50"
                      name="email"
                      onChange={e => setEmail(e.target.value)}
                      value={email}
                      ></input>
              </div>

              <div className="mt-3 flex flex-col border-b">
                  <label className="font-bold text-xl my-1">
                     Street Address
                  </label>
                  <input
                      className="flex self-start mb-6 p-1 text-left border-[2px] rounded-sm"
                      type="text"
                      size="57"
                      maxLength="50"
                      name="streetAddress"
                      onChange={e => setStreetAddress(e.target.value)}
                      value={streetAddress}
                      ></input>
              </div>

              <div className="mt-3 flex flex-col border-b">
                  <label className="font-bold text-xl my-1">
                     City
                  </label>
                  <input
                      className="flex self-start mb-6 p-1 text-left border-[2px] rounded-sm"
                      type="text"
                      size="57"
                      maxLength="50"
                      name="city"
                      onChange={e => setCity(e.target.value)}
                      value={city}
                      ></input>
              </div>

              <div className="mt-3 flex flex-col border-b">
                  <label className="font-bold text-xl my-1">
                      State
                  </label>
                  <select
                      className="flex self-start items-center mb-6 p-1 text-left border-[2px] rounded-sm"
                      name="category"
                      onChange={e => setState(e.target.value)}
                      value={state}
                      >
                         <option value="">--Please choose a State--</option>
                        {states.map((state, i) => (
                           <option key={i} value={state} className=''>{state}</option>
                        ))}
                      </select>
              </div>

              <div className="mt-3 flex flex-col border-b">
                  <label className="font-bold text-xl my-1">
                     Zip Code
                  </label>
                  <input
                      className="flex self-start mb-6 p-1 text-left border-[2px] rounded-sm"
                      type="text"
                      size="57"
                      maxLength="50"
                      name="zipCode"
                      onChange={e => setZipCode(e.target.value)}
                      value={zipCode}
                      ></input>
              </div>

              <div className="mt-3 flex flex-col border-b">
                  <label className="font-bold text-xl my-1">
                     Profile Image
                  </label>
                  <input
                      className="flex self-start mb-6 p-1 text-left border-[2px] rounded-sm"
                      type="url"
                      size="57"
                      maxLength="50"
                      name="profileImg"
                      onChange={e => setProfileImg(e.target.value)}
                      value={profileImg}
                      ></input>
              </div>

              <div className="flex flex-row mt-5 justify-end">
                  <button
                      className="button"
                      onClick={e => {

                      }}>
                      Cancel
                  </button>
                  <button
                      className="button ml-10"
                      onClick={e => {
                        onProfileEdit(e)
                      }}>
                      Submit
                  </button>
              </div>
          </form>
    </div>
  )}else {
    return '..loading'
  }
}

export default EditProfile
