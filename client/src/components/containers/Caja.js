import React from 'react'

export const Caja = ({ children, ...props}) => {
    const {titulo} = props;
    return (
        <div className='caja'>
            <p className='--caja-titulo'>{titulo || ''}</p>
            {children}
        </div>
    )
}
