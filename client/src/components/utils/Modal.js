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


    useEffect(() => {
        const modalTimeout = setTimeout(() => {
            setCerrarModal(true);
        }, TIEMPO);

        return () => {
            clearTimeout(modalTimeout)
        };
    }, []);

    if (!isOpen) return null;

    return (
        <ReactPortal wrapperId="portal-root-modal">
            <div className="modal fade-out-afer-3s">
                <div 
                    className={`modal-content ${isError === false && 'modal-error'} ${isSuccess === false && 'modal-success'}`}>
                    <button onClick={handleClose} className={`modal-close-btn ${isError === false && 'modal-btn-error'}${isSuccess === false ? '' : 'modal-btn-success'}`
                    }>
                        x
                    </button>
                    {children}
                </div>
            </div>
        </ReactPortal>
    );
};
