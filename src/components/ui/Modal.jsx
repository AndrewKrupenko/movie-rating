import { useRef, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";

export default function Modal({ title, isOpen, onClose, children }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-wrapper">
      <div className="modal-wrapper-inner" ref={modalRef}>
        {title && (
          <h3 className="modal-title">
            {title}
            <button className="modal-close-button" onClick={onClose}>
              <XMarkIcon className="w-8 h-8" />
            </button>
          </h3>
        )}
        <div className="modal-inner">{children}</div>
      </div>
    </div>
  );
}
