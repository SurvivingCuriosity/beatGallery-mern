import React from 'react'

export const CheckboxAndLabel = (props) => {
    const { label, name, checked, callback } = props;
    
    const handleCheckbox = (evt) => {
        const isChecked = evt.target.checked;
        callback(name, isChecked)
    }

    return (
        <div style={{ display: 'flex', gap: '0.5em', alignItems: 'center' }}>
            <input
                id={`checkbox-${name}`}
                name={name}
                checked={checked}
                onChange={handleCheckbox}
                style={{ transform: 'scale(1.25)' }}
                type='checkbox'
            >
            </input>
            <label htmlFor={`checkbox-${name}`}>{label}</label>
        </div>
    )
}
