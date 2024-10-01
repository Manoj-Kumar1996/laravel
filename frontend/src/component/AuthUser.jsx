import React from 'react'
import { Navigate } from 'react-router-dom';


const AuthUser = ({children}) => {

    const isAuthenticated = sessionStorage.getItem('token');
    if(!isAuthenticated){
        return <Navigate to="/login"/>
    }
  return children
}

export default AuthUser;