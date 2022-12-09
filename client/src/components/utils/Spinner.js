import React from 'react'

export const Spinner = (props) => {
  const {enBoton} = props;
  return (
      <div 
        className={enBoton && 'btn-spinner'}
        id="loading">
      </div>
  )
}
