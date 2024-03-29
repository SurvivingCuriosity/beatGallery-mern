import React from 'react'
import {UserBottomNav} from '../UserBottomNav'
import { useSelector } from 'react-redux';

export const ScreenWithNav = ({children, ...props}) => {
  const {titulo} = props;
  const isProducer = useSelector((state) => state?.userData?.isProducer);
  const isArtist = useSelector((state) => state?.userData?.isArtist);
  return (
    <>
        <div className='screen inApp-screen2 screen-with-nav'>
            <h2 className='screen-tittle'>{titulo}</h2>
            {children}
        </div>
        <UserBottomNav isProducer={isProducer} hide={!isProducer && !isArtist && true}/>
    </>
  )
}
