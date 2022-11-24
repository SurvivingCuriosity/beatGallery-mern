import React from 'react';
import {Outlet, Navigate} from 'react-router-dom'

const PrivateRoutes = () => {
  return(
    localStorage.getItem('authToken') 
      ? <Outlet /> 
      : <Navigate to='/welcome' />
  )
}
export default PrivateRoutes;