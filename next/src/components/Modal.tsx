import React from "react";

type Props = {
  title?: string;
  message?: string;
  close?: () => void;
  confirm?: () => void;
};

const Modal = ({ title, message, close, confirm }: Props) => {
  return (
    <div className="fixed top-0 left-1/2 bottom-0 right-0 -translate-x-1/2 flex items-center justify-center w-full z-50">
      <div
        className=" bg-black bg-opacity-50 fixed top-0 left-0 right-0 bottom-0"
        onClick={close}
      ></div>
      <div className="w-[90%] bg-white p-8 rounded-lg max-w-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <div className="w-6 h-6 text-gray-600 cursor-pointer" onClick={close}>
            ✖
          </div>
        </div>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex gap-4 text-lg">
          <button
            className="flex-1 h-10 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
            onClick={() => {
              confirm && confirm();
              close && close();
            }}
          >
            Confirm
          </button>
          <button
            className="flex-1 h-10 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
            onClick={close}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
