import React from 'react'
import HeaderMain from '../layout/MainHeader'
import Parallax from '../common/Parallax'
import HotelService from '../common/HotelService'
import RoomCarousel from '../room/RoomCarousel'
import RoomSearch from '../common/RoomSearch'
import { useLocation } from 'react-router-dom'
const Home = () => {

  const location = useLocation()
  const message = location.state && location.state.message
  const currentUser = localStorage.getItem("userId")


  return (
    <section>
      {message && <p className='text-warning px-5 text-center'>{message}</p>}
      {currentUser && <h6 className='text-success text-center'>You are logged-In as {currentUser}</h6>}
      <HeaderMain/>
      <section >
        <div className="container">
          <RoomSearch />
          <RoomCarousel />
          <Parallax />
          <RoomCarousel />
          <HotelService />
          <Parallax />
          <RoomCarousel />
        </div>
      </section>
    </section>
  )
}

export default Home