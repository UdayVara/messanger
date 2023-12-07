import React from 'react'
import Header from './Header'
import Body from './Body'
import Footer from './Footer'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/redux/store'

function  ChatSection() {
  const receiver = useSelector((state:RootState)=>state.receiver)
  return (
    <>
      <div className={`w-full h-full flex flex-col`}>
        <Header />
        <Body />
        <Footer  />
      </div>
    </>
  )
}

export default ChatSection