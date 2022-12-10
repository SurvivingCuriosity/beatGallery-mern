import { React, useEffect, useState } from "react";
import icon_success from '../../assets/imgs/icons/icon_success.svg'
import icon_error from '../../assets/imgs/icons/icon_error.svg'
import ReactPortal from "./Portal";
export const Modal = ({ children, isOpen, handleClose, isError, isSuccess }) => {
    const [clases, setClases] = useState('');
    const [clasesBoton, setClasesBoton] = useState('');
    useEffect(() => {
        const closeOnEscapeKey = e => e.key === "Escape" ? handleClose() : null;
        document.body.addEventListener("keydown", closeOnEscapeKey);

        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
    }, [handleClose]);
    
    useEffect(() => {
        if (isSuccess === true) {
            setClases('modal-content modal-success')
            setClasesBoton('modal-close-btn modal-btn-success')
        }
        if (isError === true) {
            setClases('modal-content modal-error')
            setClasesBoton('modal-close-btn modal-btn-error')
        }
        if(!isSuccess && !isError){
            setClases('modal-content');
            setClasesBoton('modal-close-btn');
        }
    }, [isError, isSuccess]);

    if (!isOpen) return null;


    return (
        <ReactPortal wrapperId="portal-root-modal">
            <div className="modal">
                <div
                    className={clases}>
                    <button onClick={handleClose} className={clasesBoton}
                    >
                        x
                    </button>
                    {isError && <img src={icon_error}></img>}
                    {isSuccess && <img src={icon_success}></img>}
                    {children}
                </div>
            </div>
        </ReactPortal>
    );
};
