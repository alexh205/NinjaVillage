import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserPasswordThunk } from '../../store/sessionReducer';

const PasswordUpdate = ({ showProfile, user }) => {
    const dispatch = useDispatch();

    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const onPasswordUpdate = async e => {
        e.preventDefault();
        if (password !== repeatPassword)
            return alert('The password and repeatPasswords do not match');
        const userId = user.id;
        await dispatch(updateUserPasswordThunk(password, userId));
        

        setPassword('');
        setRepeatPassword('');
        showProfile(false);
    };

    return (
        <form className="flex flex-col items-center justify-start md:justify-center w-fit container">
            <div className="flex flex-col mb-3">
                <div className="flex flex-col md:flex-row">
                    <div className="mt-3 mr-5 flex flex-row ">
                        <label className="font-bold text-lg mr-2 my-1 whitespace-nowrap">
                            New password:
                        </label>
                        <input
                            className=" mb-3 p-1 text-left border-[2px] rounded-sm"
                            type="text"
                            size="20"
                            maxLength="40"
                            name="password"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <div className="mt-3 flex flex-row ">
                        <label className="font-bold text-lg mr-2 my-1 whitespace-nowrap">
                            Confirm new password:
                        </label>
                        <input
                            className=" mb-3 p-1 text-left border-[2px] rounded-sm"
                            type="text"
                            size="20"
                            maxLength="40"
                            name="Repeat Password"
                            onChange={e => setRepeatPassword(e.target.value)}
                            value={repeatPassword}
                        />
                    </div>
                </div>
                <div className="flex flex-row items-center justify-start my-2">
                    <button
                        className="button mr-6 mb-2"
                        onClick={e => {
                            onPasswordUpdate(e);
                        }}>
                        Submit
                    </button>
                    <button
                        className="button mr-2 mb-2"
                        onClick={e => {
                            e.preventDefault();
                            setPassword('');
                            setRepeatPassword('');
                            showProfile(false);
                        }}>
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    );
};

export default PasswordUpdate;
