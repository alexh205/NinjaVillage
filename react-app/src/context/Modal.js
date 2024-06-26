import React, { useEffect, useContext, createContext, useCallback } from 'react';
import { useSpring, animated, useTransition } from '@react-spring/web';

const ModalContext = createContext();

const Modal = ({ children, isOpen, onClose }) => {
  const handleEscape = useCallback(
    e => {
      if (e.keyCode === 27) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);

    return () => document.removeEventListener('keydown', handleEscape);
  }, [handleEscape]);

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
    transform: isOpen ? 'translateY(0%)' : 'translateY(-100%)',
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
          className="fixed top-0 left-0 right-0 bottom-0 w-[100%] h-[100%] overflow-x-hidden overflow-y-hidden z-30 bg-[rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-center pt-[30vh]">
            <animated.div
              style={springs}
              className=""
              onClick={e => e.stopPropagation()}>
              <div className="relative flex flex-col border-solid border-[1px] rounded-md bg-clip-padding p-[0.6rem] bg-white">
                <ModalContext.Provider value={{ onClose }}>
                  {children}
                </ModalContext.Provider>
              </div>
            </animated.div>
          </div>
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
    <div className="p-[0.35rem] flex items-center justify-between border-b-[1px] bg-[#f0f2f2]">
      <div className="text-[1.1rem] leading-6">{children}</div>
      <DismissButton className="border-none text-[1rem] p-[0.2rem] cursor-pointer font-bold text-gray-400">
        &times;
      </DismissButton>
    </div>
  );
};

const ModalBody = ({ children }) => {
  return (
    <div className="p-p-[0.35rem]">
      <div className="">{children}</div>
    </div>
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;

Modal.DismissButton = DismissButton;

export default Modal;
