import React, { useContext, useEffect } from 'react'
import projectcontext from '../projectcontext/projectContext'
import AdminNav from './AdminNav'

function Admin() {
    const context = useContext(projectcontext)
    const {checkAuthority} = context

    useEffect(() => {
        // checkAuthority()
    }, [])
  return (
    <>
    <AdminNav />
    <div className="bghomepage"></div>
    </>
  )
}

export default Admin