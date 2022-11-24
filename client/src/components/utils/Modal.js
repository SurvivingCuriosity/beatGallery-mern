import { React, useEffect, useState} from "react";
import ReactPortal from "./Portal";
export const Modal = ({ children, isOpen, handleClose }) => {
    const TIEMPO = 5000;
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const closeOnEscapeKey = e => e.key === "Escape" ? handleClose() : null;
        document.body.addEventListener("keydown", closeOnEscapeKey);

        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
    }, [handleClose]);


    useEffect(() => {
        let closeTimeout;
        const modalTimeout = setTimeout(() => {
            setFadeOut(true);
            closeTimeout = setTimeout(() => {
                handleClose()
            }, 500);
        }, TIEMPO);

        return () => {
            clearTimeout(closeTimeout)
            clearTimeout(modalTimeout)
        };
    }, []);

    if (!isOpen) return null;

    return (
        <ReactPortal wrapperId="portal-root-modal">
            <div className="modal">
                <div className={`modal-content ${fadeOut && 'fade-out-disappear'}`}>
                <button onClick={handleClose} className="modal-close-btn">
                    X
                </button>
                    {children}
                </div>
            </div>
        </ReactPortal>
    );
};
