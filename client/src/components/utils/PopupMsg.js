import React from "react";

export const PopupMsg = ({type, msg}) => {

    return(
        <div className={`popup-msg slide-down`} style={{color:`${type==='error' ? `red` : `green`}`}}>
            {msg}
        </div>
    )
}