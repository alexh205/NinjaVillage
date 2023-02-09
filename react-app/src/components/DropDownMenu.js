import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../store/sessionReducer";
import { Menu } from "@headlessui/react";
import { ClipboardDocumentListIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { SlLogout } from "react-icons/sl"
import { RiUserSettingsLine } from "react-icons/ri"


const DropDownMenu = () => {
    const user = useSelector(state => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <>
            {!user ? (
                <div
                    className="link"
                    onClick={() => {
                        history.push("/login") }}>
                    <p>{"Sign In"}</p>
                    <p className="font-extrabold md:text-sm">Account & Lists</p>
                </div>
            ) : (
                user && (
                    <Menu as="div">
                        <Menu.Button onClick={()=>{}}>
                            <p>{`Hello, ${user.name}`}</p>
                            <p className="font-extrabold md:text-sm">
                                Account & Lists</p>
                        </Menu.Button>

                        <Menu.Items
                            as="section"
                            className="absolute justify-center flex flex-col z-10 items-center right-[170px] md:right-[194px] h-[135px] w-[138px] mt-[2px] rounded-xl bg-gray-100 border-2 border-black">

                            <Menu.Item className='flex flex-row my-1 pb-2 px-[26px] items-center border-b-[2px] border-black'>
                                <a
                                    className="text-black text-[17px] font-bold"
                                    href={`/profile/${user.id}`}> <RiUserSettingsLine className="text-ninja_green text-2xl mr-1"/>
                                    Profile </a>
                            </Menu.Item>

                            <Menu.Item className='flex flex-row my-1 pb-2 px-[6px] items-center border-b-[2px] border-black'>
                                <a
                                    className="text-black text-[17px] font-bold"
                                    href="/products/new"><ShoppingBagIcon className="text-ninja_green h-6 mr-1"/>
                                    New Listing </a>
                            </Menu.Item>

                            {/* <Menu.Item className='flex flex-row my-1 pb-2 px-[11px] items-center border-b-[2px] border-black'>
                                <a
                                    className="text-black text-[17px] font-bold"
                                    href="/account-settings"><ClipboardDocumentListIcon className="text-ninja_green h-6 mr-1"/>
                                    Wish Lists </a>
                            </Menu.Item> */}

                            <Menu.Button
                                className='text-black text-[16px] font-bold mr-2 flex flex-row my-1 pb-2 items-center'
                                onClick={async () => {
                                    await dispatch(logout());
                                    history.push("/") }}><SlLogout className="text-ninja_green text-[19px] mr-[8px]"/>
                                Sign out
                            </Menu.Button>


                        </Menu.Items>
                    </Menu>
                )
            )}
        </>
    );
};

export default DropDownMenu;
