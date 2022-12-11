import React from 'react'
import { useSelector } from 'react-redux';

export const FormButton = (props) => {
    const {text, callback} = props;
    const {loading} = useSelector(state=>state);
  return (
      <button 
        disabled={loading===true ? true : false}
        onClick={(evt)=>{callback(evt)}}
        className="btn btn-1" 
        type='submit'>
            {
            loading===true
                ?
                'Loading...'
                :
                text
            }
        </button>
  )
}
