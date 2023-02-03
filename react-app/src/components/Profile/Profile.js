import React, {useState} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { editUserThunk, getUserThunk } from '../../store/sessionReducer'

const Profile = () => {
    const {userId} = useParams()
    const user = useSelector(state => state.session.user);

    const dispatch = useDispatch()
    const history = useHistory()

    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [name, setName] = useState(user.Name)
    const [streetAddress, setStreetAddress] = useState(user.street_address)
    const [city, setCity] = useState(user.city)
    const [state, setState] = useState(user.state)
    const [zipCode, setZipCode] = useState(user.zip_code)
    const [profileImg, setProfileImg] = useState(user.profile_img)
    const [password, setPassword] = useState(user.password)
    const [repeatPassword, setRepeatPassword] = useState('')


    const onProfileEdit = async e => {
        e.preventDefault();

        await dispatch(
            editUserThunk(username,email, name, streetAddress, city, state, zipCode,profileImg, password, userId)
        );

        
    };
  return (
    <div>
        <div></div>
        <div></div>
    </div>
  )
}

export default Profile
