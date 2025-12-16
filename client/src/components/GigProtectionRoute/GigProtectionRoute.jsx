import React from 'react'
import { Navigate } from 'react-router-dom';

const GigProtectionRoute = ({children}) => {
    const isSeller = JSON.parse(localStorage.getItem("currentUser")).isSeller;
    return (isSeller ? children : <Navigate to={'/'}/>)
}

export default GigProtectionRoute
