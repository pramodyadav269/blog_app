import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../FunctionComponent/Navbar'
import Footer from '../FunctionComponent/Footer'

function UserLayout() {
  return (
    <>
        <Navbar />
        <Outlet />
        <Footer />
    </>
  )
}

export default UserLayout