import React from 'react'

export const Spinner = (props) => {
  const {enBoton} = props;
  return (
      <div 
        className={enBoton===true && 'loading-btn'}
        id="loading">
      </div>
  )
}
