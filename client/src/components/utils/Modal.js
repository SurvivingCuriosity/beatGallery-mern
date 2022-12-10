import { React, useEffect, useState } from "react";
import ReactPortal from "./Portal";
export const Modal = ({ children, isOpen, handleClose, isError, isSuccess }) => {
    const TIEMPO = 3000;
    const [cerrarModal, setCerrarModal] = useState(false);

    useEffect(() => {
        const closeOnEscapeKey = e => e.key === "Escape" ? handleClose() : null;
        document.body.addEventListener("keydown", closeOnEscapeKey);

        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
    }, [handleClose]);

    if (!isOpen) return null;

    return (
        <ReactPortal wrapperId="portal-root-modal">
            <div className="modal">
                <div 
                    className={`modal-content ${isError === true ? 'modal-error' : ''} ${isSuccess === true ? 'modal-success' : ''}`}>
                    <button onClick={handleClose} className={`modal-close-btn ${isError === false ? 'modal-btn-error' : 'modal-close-btn'} ${isSuccess === false ? 'modal-close-btn' : 'modal-btn-success'}`
                    }>
                        x
                    </button>
                    {children}
                </div>
            </div>
        </ReactPortal>
    );
};
