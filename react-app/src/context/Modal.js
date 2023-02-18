import React, { useEffect, useContext, createContext } from "react";
import { useSpring, animated, useTransition } from "@react-spring/web";

const ModalContext = createContext();

const Modal = ({ children, isOpen, onClose }) => {
    const handleEscape = e => {
        if (e.keyCode === 27) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleEscape);

        return () => document.removeEventListener("keydown", handleEscape);
    }, []);

    const modalTransition = useTransition(isOpen, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 1 },
        config: {
            duration: 300,
        },
    });
    const springs = useSpring({
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? "translateY(0%)" : "translateY(-100%)",
        config: {
            duration: 300,
        },
    });

    return modalTransition(
        (styles, isOpen) =>
            isOpen && (
                <animated.div
                    style={styles}
                    onClick={onClose}
                    className="fixed top-0 left-0 right-0 bottom-0 width-[100%] height-[100%] overflow-x-hidden overflow-y-hidden z-10 bg-gray-200">
                    <animated.div
                        style={springs}
                        className="w-max-[500px] m-[2rem]"
                        onClick={e => e.stopPropagation()}>
                        <div className="relative flex flex-col border-solid border-[1px] rounded-md bg-clip-padding p-[1rem] bg-white">
                            <ModalContext.Provider value={{ onClose }}>
                                {children}
                            </ModalContext.Provider>
                        </div>
                    </animated.div>
                </animated.div>
            )
    );
};

const DismissButton = ({ children, className }) => {
    const { onClose } = useContext(ModalContext);

    return (
        <button type="button" className={className} onClick={() => onClose()}>
            {children}
        </button>
    );
};

const ModalHeader = ({ children }) => {

    return (
        <div className="p-[1rem] flex items-center justify-between border-b-[1px]">
            <div className="text-[1.25rem] leading-6">{children}</div>
            <DismissButton className="border-none text-[1rem] p-[0.25rem] cursor-pointer font-bold text-gray-400">&times;</DismissButton>
        </div>
    );
};

const ModalBody = ({ children }) => {
    return (
        <div className="p-[1rem]">
            <div className="">{children}</div>
        </div>
    );
};
const ModalFooter = ({ children }) => {
    return (
        <div className="p-[1rem] flex justify-end border-t-[1px] border-solid">
            <div className="">{children}</div>
        </div>
    );
};
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.DismissButton = DismissButton;

export default Modal;
