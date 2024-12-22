import React from 'react'
import successicon from "../Images/success-icon.png"
import { useNavigate } from 'react-router-dom'

function Confirmation() {
    const navigate = useNavigate()
  return (
    <div className='confirmation'>
        <h1>Thank You</h1>
        Thank You for Shopping. refer myOrder for details
        <br />
        <button className='btn btn-success' onClick={() => {
            navigate("/myorder")
        }}>My Order</button>
     </div>
  )
}

export default Confirmation
