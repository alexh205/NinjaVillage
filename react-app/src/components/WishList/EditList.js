import React, { useState, useRef, useEffect } from "react";
import { useDispatch} from "react-redux";
import { editListThunk } from "../../store/wishListReducer";
import { authenticate } from "../../store/sessionReducer";

const EditList = ({ list, edit, userLists }) => {
    const dispatch = useDispatch();
    const editRef = useRef();
    const [name, setName] = useState(list.name);
    const [validateErrors, setValidateErrors] = useState([]);

    const listId = list.id;


    useEffect(() => {
        function handleClickOutside(event) {
            if (editRef.current && !editRef.current.contains(event.target)) {
                edit(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [editRef]);

    const validate = () => {
        const errors = [];

        if (!name) {
            errors.push("Please provide a 'name' for the list");
        }

        if (name.length >= 20) {
            errors.push("Please limit your name to 20 characters or less");
        }

        if (userLists.some(list => list.name === name)) {
            errors.push("List name already exists.");
        }

        return errors;
    };

    const handleSave = async e => {
        e.preventDefault();

        if (name === "Wish List") {
            alert("'Wish List' can't be edited");
            return;
        }

        const errors = validate();

        if (errors.length) {
            setValidateErrors(errors);
            return;
        }

        await dispatch(editListThunk(name, listId));
        await dispatch(authenticate());
        edit(false);
        setName("");
        setValidateErrors([]);
    };
    const handleKeyPress = e => {
        if (name === "Wish List") {
            alert("'Wish List' can't be edited");
            return;
        }
        if (e.key === "Enter") {
            handleSave(e);
        }
    };

    return (
        <div
            ref={editRef}
            className="flex flex-row text-xs md:text-base justify-between items-center w-full">
            <input
                value={name}
                disabled={name === "Wish List"}
                onChange={e => setName(e.target.value)}
                onKeyDown={handleKeyPress}
                className="p-1 flex md:flex-grow mr-1"
            />
            {validateErrors.map((error, i) => (
                <div className="text-red-500 text-[11px] font-semibold" key={i}>
                    {error}
                </div>
            ))}

            <button
                onClick={handleSave}
                className={`ml-auto ${
                    validateErrors.length > 0 ? "hidden" : "flex "
                }`}>
                Save
            </button>
        </div>
    );
};

export default EditList;
