
import React from 'react'
import { Navigate,useNavigate,Outlet } from 'react-router-dom'

const AuthGuard = () => {
    const IsAuth = !!localStorage.getItem('token')
    // console.log(IsAuth)
  return (
      IsAuth ? <Outlet/> : <Navigate to = 'login'/>
  )
}

export default AuthGuard
