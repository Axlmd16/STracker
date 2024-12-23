import { X } from "lucide-react";
import React, { useRef, forwardRef, useImperativeHandle } from "react";

const Modal = forwardRef(({ children }, ref) => {
    const modalRef = useRef(null);

    useImperativeHandle(ref, () => ({
        openModal: () => {
            modalRef.current.showModal();
        },
        closeModal: () => {
            modalRef.current.close();
        },
    }));

    return (
        <div>
            <dialog ref={modalRef} className="modal">
                <div className="modal-box w-10/12 max-w-4xl text-gray-700">
                    <form method="dialog">
                        <button className="btn absolute top-2 right-2 btn-sm">
                            <X size={24} />
                        </button>
                    </form>
                    {children}
                </div>
            </dialog>
        </div>
    );
});

export default Modal;
