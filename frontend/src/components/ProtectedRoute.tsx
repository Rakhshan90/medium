// import React from 'react'

import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type ChildrenType = {
    children: ReactNode
}

const ProtectedRoute = ({children}: ChildrenType) => {

    const token = localStorage.getItem('token');
    if(!token){
        return <Navigate to='/signin' />
    } 
    else {
        return children
    }
}

export default ProtectedRoute