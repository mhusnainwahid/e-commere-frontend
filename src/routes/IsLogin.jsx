
import { useNavigate,Navigate,Outlet } from "react-router-dom";

import React from 'react'

const IsLogin = () => {
    const isLogin = !!localStorage.getItem('token')
  return (
    isLogin ? <Navigate to = '/'/> : <Outlet/>
  )
}

export default IsLogin
