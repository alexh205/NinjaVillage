import React, { useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/sessionReducer";
import NinjaVillage_logo from "../../Media/NinjaVillage_logo.png";
import { useHistory, Link } from "react-router-dom";

const LoginForm = () => {
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const user = useSelector(state => state.session.user);

    const dispatch = useDispatch();
    const history = useHistory();


    const onLogin = async e => {
        e.preventDefault();
        const data = await dispatch(login(email, password));

        if (data) {
            setErrors(data);
        }
    };



    const updateEmail = e => {
        setEmail(e.target.value);
    };

    const updatePassword = e => {
        setPassword(e.target.value);
    };


    if (user) {
        return <Redirect to="/" />;
    }

    return (
        <div className="bg-ninja_green h-[100vh] flex flex-col items-center">
            <Link to="/">
                <img
                    className="object-contain my-[20px] mx-auto w-[100px]"
                    src={NinjaVillage_logo}
                    alt=""
                />
            </Link>
            <div className="w-[350px] h-fit flex flex-col rounded-md border-[1px] border-gray-300 py-[20px] px-[30px]">
                <h1 className="font-medium mb-4 text-[27px] text-white"> Sign in</h1>
                <form onSubmit={onLogin}>
                    <div className="text-[14px] text-red-600 mb-[4px]">
                        {errors.map((error, ind) => (
                            <div key={ind}>{error}</div>
                        ))}
                    </div>
                    <div className="mb-[5px] flex flex-col">
                        <label className="font-medium text-white" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="border-[1px] border-ninja_green-light py-1"
                            name="email"
                            type="text"
                            // placeholder='Email'
                            value={email}
                            onChange={updateEmail}
                        />
                    </div>
                    <div className="mb-[5px] flex flex-col">
                        <label className="font-medium text-white" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="border-[1px] border-ninja_green-light py-1"
                            name="password"
                            type="password"
                            // placeholder='Password'
                            value={password}
                            onChange={updatePassword}
                        />
                        <button
                            className="my-3 button p-[5px] border-[1px] border-ninja_green-light"
                            type="submit">
                            Login
                        </button>
                    </div>
                </form>
                <p className="text-[11px] text-white">
                    By login, you agree to NinjaVillage's Conditions of Use and
                    Privacy Notice.
                </p>
            </div>
            <div className="flex flex-col items-center mt-5 w-[350px]">
                <p className="text-[11px] text-violet-300 mb-2">New to NinjaVillage?</p>
                <button
                    className="cursor-pointer p-[5px] text-xs text-semibold md:text-sm rounded-sm focus:outline-none focus:ring-2 bg-gradient-to-b from-slate-100 to-slate-200 focus:ring-yellow-500 active:from-slate-200 w-[100%] border-[1px] border-ninja_green-light"
                    type="button "
                    onClick={() => {
                        history.push("/signup");
                    }}>
                    Create your account
                </button>
            </div>
        </div>
    );
};

export default LoginForm;
