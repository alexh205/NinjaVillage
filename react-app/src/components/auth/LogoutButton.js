import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {logout} from '../../store/session';
import Loading from '../Loading';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const [hasClicked, setHasClicked] = useState(false);

  const onLogout = async e => {
    setHasClicked(true);
    await dispatch(logout());
    setHasClicked(false);
  };

  return (
    <>
      {hasClicked && <Loading />}
      <button onClick={onLogout}>Logout</button>
    </>
  );
};

export default LogoutButton;
