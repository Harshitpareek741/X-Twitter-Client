import React from 'react';
import Image from 'next/image';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative p-4 rounded-lg max-w-full max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl text-white hover:text-green-200 hover:bg-yellow-950 hover:rounded-full hover:bg-opacity-30"
        >
          <IoMdClose />
        </button>
        <div className="relative max-w-[90vw] max-h-[90vh]">
          <Image
            src={imageUrl}
            alt="Full Screen"
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
