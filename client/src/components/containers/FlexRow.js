import React from 'react'

export const FlexRow = ({ children, ...props }) => {
    const { gap = '0.5em', width, wrap, alignItems, justifyContent='' } = props;

    const style = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: wrap,
        gap: gap,
        alignItems: alignItems || 'center',
        width: width,
        justifyContent: justifyContent
        // minHeight: '2em'
    }

    return (
        <div style={style}>
            {children}
        </div>
    )
}
