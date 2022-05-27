import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

export const ProtectedRoute = (props) => {

  const isAuth = useSelector(state => state.auth.token)
  const location = useLocation()

  return isAuth
  ? props.children
  : <Navigate to="/" replace state={{ from: location.pathname }} />
}
