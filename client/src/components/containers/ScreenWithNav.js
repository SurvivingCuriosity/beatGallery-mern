import React from 'react'
import {UserBottomNav} from '../UserBottomNav'
export const ScreenWithNav = ({children, ...props}) => {
  const {titulo} = props;
  return (
    <>
        <div className='screen inApp-screen2 screen-with-nav'>
            <h2 className='screen-tittle'>{titulo}</h2>
            {children}
        </div>
        <UserBottomNav />
    </>
  )
}
