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
                <div className="modal-box w-5/12 max-w-3xl text-gray-700">
                    {children}
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                </div>
            </dialog>
        </div>
    );
});

export default Modal;
