import { X } from "lucide-react";
import React, { useRef, forwardRef, useImperativeHandle } from "react";

const ModalForm = forwardRef(({ children, formRef, handleCloseModal }, ref) => {
    const modalRef = useRef(null);

    useImperativeHandle(ref, () => ({
        openModal: () => {
            modalRef.current.showModal();
        },
        closeModal: () => {
            modalRef.current.close();
            if (formRef && formRef.current) {
                setTimeout(() => {
                    formRef.current.reset();
                }, 300);
            }
            // Llama a handleCloseModal, pero evita recursión
            if (handleCloseModal) {
                handleCloseModal(false); // Asegúrate de que esto no desencadene otra llamada a closeModal
            }
        },
    }));

    const handleCancel = () => {
        if (formRef && formRef.current) {
            formRef.current.reset();
        }
        // Solo maneja el cierre, sin llamar de nuevo a closeModal
        if (handleCloseModal) {
            handleCloseModal(false);
        }
    };

    return (
        <div>
            <dialog ref={modalRef} className="modal" onCancel={handleCancel}>
                <div className="modal-box w-5/12 max-w-3xl text-gray-700">
                    <form method="dialog">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={() => {
                                modalRef.current.close();
                                handleCancel();
                            }}
                        >
                            <X size={24} />
                        </button>
                    </form>
                    {children}
                </div>
            </dialog>
        </div>
    );
});

export default ModalForm;
