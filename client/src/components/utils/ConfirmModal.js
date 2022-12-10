import { React, useEffect, useState } from "react";
import { FlexRow } from "../containers/FlexRow";
import ReactPortal from "./Portal";

export const ConfirmModal = ({ children, isOpen, handleClose, action, callbackYes, callbackNo }) => {


    useEffect(() => {
        const closeOnEscapeKey = e => e.key === "Escape" ? handleClose() : null;
        document.body.addEventListener("keydown", closeOnEscapeKey);

        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
    }, [handleClose]);

    if (!isOpen) return null;

    return (
        <ReactPortal wrapperId="portal-root-confirm-modal">
            <div className="confirm-modal">
                <div className="confirm-modal-content">
                    <button onClick={handleClose} className='modal-close-btn'>
                        x
                    </button>

                    {children}

                    <FlexRow>
                        <button onClick={callbackYes} className="btn btn-confirm">YES</button>
                        <button onClick={callbackNo} className="btn btn-deny">NO</button>
                    </FlexRow>
                </div>
            </div>
        </ReactPortal>
    );
};
