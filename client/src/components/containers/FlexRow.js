import React from 'react'

export const FlexRow = ({ children, ...props }) => {
    const { gap = '0.5em', width, wrap, alignItems } = props;

    const style = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: wrap,
        gap: gap,
        alignItems: alignItems || 'center',
        width: width,
        // minHeight: '2em'
    }

    return (
        <div style={style}>
            {children}
        </div>
    )
}
