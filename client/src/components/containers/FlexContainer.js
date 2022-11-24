import React from 'react'

export const FlexContainer = ({ children, ...props }) => {
    const { columns, gap = '0.5em', width = '100%', justifyContent } = props;

    const style = {
        display: 'flex',
        flexDirection: columns ? 'column' : 'row',
        justifyContent:justifyContent || '',
        gap: gap,
        width: width,
        height:'100%'
    }

    return (
        <div className='flex-container' style={style}>
            {children}
        </div>
    )
}
