const ModalConfirmacion = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;  

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-xl font-semibold text-center mb-4">¿Estás seguro?</h3>
                <p className="text-center mb-4">¿Quieres eliminar esta asignación? Esta acción no se puede deshacer.</p>
                <div className="flex justify-center gap-4">
                    <button
                        className="btn-custom btn-custom-warning"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className="btn-custom btn-custom-success"
                        onClick={onConfirm}  
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmacion;
