import React, { useEffect, useState } from 'react'
import { cancelBooking, getAllBooking } from '../utils/ApiFunctions'
import { da } from 'date-fns/locale'
import Header from '../common/Header'
import BookingsTable from './BookingsTable'

const Bookings = () => {
    const[bookingInfo,setBookingInfo] = useState([])
    const[isLoading,setIsloading] = useState(true)
    const[error,setError] = useState("")

    useEffect(()=>{
        setTimeout(getAllBooking().then((data)=>{
            console.log(data)
            setBookingInfo(data)
            setIsloading(false)
            setError("")
        }).catch((e)=>{
            setError(e.message)
            setIsloading(false)
        }),1000)
    },[])


    const handleBookingCancellation = async(bookingId)=>{
        try{
            await cancelBooking(bookingId)
            const data = await getAllBooking()
            setBookingInfo(data)
        }catch(e){
            setError(e.message)
        }
    }

    return (
        <section className='container' style={{backgroundColor:"whitesmoke"}}>
            <Header title={'Existing Bookings'} />
            {error && <div className='text-dangre'>{error}</div>}
            {isLoading?(
                <div>
                    Loading existing bookings
                </div>
            ):(
                <BookingsTable 
                    bookingInfo={bookingInfo} 
                    handleBookingCancellation={handleBookingCancellation}
                />
            )}

        </section>
    )
}

export default Bookings