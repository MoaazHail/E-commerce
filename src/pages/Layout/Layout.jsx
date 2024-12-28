import React from 'react'
import MyNavbar from '../../components/MyNavbar/MyNavbar'
import MyFooter from '../../components/MyFooter/MyFooter'
import { Outlet } from 'react-router-dom'
export default function Layout() {
  return (
    <>
        <MyNavbar/>
        <div className='pt-28 p-10'>
          <Outlet/>
        </div>
        <MyFooter/>
    </>
  )
}
