import React from 'react'
import { Link } from 'react-router-dom'

function Admin() {
  return (
    <section className='container mt-5'>
      <h2>Welcome to admin</h2>
      <hr />
      <Link to={"/existing-rooms"}>Manage rooms</Link>
      <hr />
      <Link to={"/existing-bookings"}>Manage bookings</Link>
    </section>

  )
}

export default Admin