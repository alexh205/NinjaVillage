import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../store/sessionReducer";
import NinjaVillage_logo from "../../Media/NinjaVillage_logo.png";
import { useHistory, Link } from "react-router-dom";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
     const [validateErrors, setValidateErrors] = useState([]);

    const user = useSelector(state => state.session.user);

    const dispatch = useDispatch();
    const history = useHistory();


     const validate = () => {
        const errors = [];

        if (!email) errors.push("Please provide a 'Email'");
        if (!password) errors.push("Please provide a 'Password'");

        return errors;
    };

    const demoLogin = async () => {
        await dispatch(login("demo@aa.io", "password"));
    };

    const onLogin = async e => {
        e.preventDefault();


         const errors = validate();

        if (errors.length > 0) return setValidateErrors(errors);

        const data = await dispatch(login(email, password));

        setEmail("");
        setPassword("");

    };



    if (user) {
        history.push("/");
    }

    return (
        <div className="flex flex-col items-center mt-20">
            <div className="bg-ninja_green w-[350px] h-fit flex flex-col rounded-md border-[1px] border-black py-[20px] px-[30px]">
                <div className="flex flex-col justify-between items-center ">
                    <Link to="/">
                        <img
                            className="object-contain mb-3 w-[100px]"
                            src={NinjaVillage_logo}
                            alt=""
                        />
                    </Link>
                    <div className="flex flex-row items-center">
                        <h1 className="font-medium text-[27px] text-white mr-32">
                            Sign in
                        </h1>
                        <button
                            onClick={demoLogin}
                            className="cursor-pointer p-[2px] text-xs text-blue-700 font-bold md:text-xs rounded-sm focus:outline-none focus:ring-2 bg-gradient-to-b from-slate-100 to-slate-200 focus:ring-yellow-500 active:from-slate-200 w-[75px] border-[1px] border-ninja_green-light">
                            Demo Login
                        </button>
                    </div>
                </div>
                <form onSubmit={onLogin}>
                    <ul className="text-yellow-500 text-[13px] font-semibold ml-2">
                        {validateErrors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                    <div className="mb-[5px] flex flex-col">
                        <label
                            className="font-medium text-white"
                            htmlFor="email">
                            Email
                        </label>
                        <input
                            className="border-[1px] border-ninja_green-light py-1 placeholder:pl-1"
                            name="email"
                            type="text"
                            placeholder='Email'
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-[5px] flex flex-col">
                        <label
                            className="font-medium text-white"
                            htmlFor="password">
                            Password
                        </label>
                        <input
                            className="border-[1px] border-ninja_green-light py-1 placeholder:pl-1"
                            name="password"
                            type="password"
                            placeholder='Password'
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
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
                <p className="text-[11px] text-black font-bold mb-2">
                    New to NinjaVillage?
                </p>
                <button
                    className="cursor-pointer p-[5px] text-xs font-semibold md:text-sm rounded-sm focus:outline-none focus:ring-2 bg-gradient-to-b from-slate-100 to-slate-200 focus:ring-yellow-500 active:from-slate-200 w-[100%] border-[1px] border-ninja_green-light"
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
