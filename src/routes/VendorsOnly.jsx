import React from 'react'
import { Navigate,useNavigate,Outlet } from 'react-router-dom'


const VendorsOnly = () => {
    role = localStorage.getItem("role")
  return (
    (role === 'vendor') ? <Outlet/> : <Navigate to= '/'/>
  )
}

export default VendorsOnly