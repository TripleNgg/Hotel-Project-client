import moment from 'moment'
import React, { useState } from 'react'
import { getAvailableRooms } from '../utils/ApiFunctions'
import { Button, Col, Container, Form, FormControl, Row } from 'react-bootstrap'
import RoomTypeSelector from './RoomTypeSelector'
import RoomSearchresults from './RoomSearchResults'

const RoomSearch = () => {

    const[searchQuery,setSearchQuery] = useState({
        checkInDate:"",
        checkOutDate:"",
        roomType:""
    })
    const[errorMessage,setErrorMessage] = useState("")
    const[availableRooms,setAvailableRooms] = useState([])
    const[isLoading,setIsLoading] = useState(false)
    const handleSearch = (e)=>{
        e.preventDefault()

        const checkIn = moment(searchQuery.checkInDate)
        const checkOut = moment(searchQuery.checkOutDate)
        const roomType = moment(searchQuery.roomType)
        if(!checkIn.isValid || !checkOut.isValid){
            setErrorMessage("Please enter valid date range!")
            return
        }
        if (!checkOut.isSameOrAfter(checkIn)) {
			setErrorMessage("Check-out date must be after check-in date")
			return
		}
        setIsLoading(true)
        getAvailableRooms(searchQuery.checkInDate,searchQuery.checkOutDate,searchQuery.roomType)
            .then(res=>{
                setAvailableRooms(res)
                setTimeout(()=>{
                    setIsLoading(false)
                },2000)
            }).catch(e=>{
                console.log(e)
            }).finally(()=>{
                setIsLoading(false)
            })
    }

    const handleInputChange = (e)=>{
        const{name,value} = e.target
        setSearchQuery({ ...searchQuery, [name]: value })
        const checkIn = moment(searchQuery.checkInDate)
        const checkOut = moment(searchQuery.checkOutDate)
        if(checkIn.isValid() && checkOut.isValid()){
            setErrorMessage("")
        }
    }

    const clearSearch = ()=>{
        setSearchQuery({
            checkInDate:"",
            checkOutDate:"",
            roomType:""
        })
    }

    return (
        <>
            <Container className='mt-5 mb-5 py-5'>
                <Form onSubmit={handleSearch}>
                    <Row className='justify-content-center'>

                        <Col xs={12} md={3}>
                            <Form.Group controlId='checkInDate'>
                                <Form.Label>
                                    Check-In Date
                                </Form.Label>
                                <FormControl
                                    type='date'
                                    name='checkInDate'
                                    value={searchQuery.checkInDate}
                                    onChange={handleInputChange}
                                    min={moment().format("YYYY-MM-DD")}
                                >

                                </FormControl>
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={3}>
                            <Form.Group controlId='checkOutDate'>
                                <Form.Label>
                                    Check-Out Date
                                </Form.Label>
                                <FormControl
                                    
                                    type='date'
                                    name='checkOutDate'
                                    value={searchQuery.checkOutDate}
                                    onChange={handleInputChange}
                                    min={moment().format("YYYY-MM-DD")}
                                >

                                </FormControl>
                            </Form.Group>
                        </Col>


                        <Col xs={12} md={3}>
                            <Form.Group controlId='roomType'>
                                <Form.Label>
                                    Room Type
                                </Form.Label>
                                <div className='d-flex'>
                                    <RoomTypeSelector handleRoomInputChange={handleInputChange} newRoom={searchQuery} />
                                </div>
                                <Button variant='secondary' type='submit'>Search</Button>
                            </Form.Group>
                        </Col>

                    </Row>
                </Form>
                {isLoading?(
                    <p>Finding Available Rooms.....</p>
                ):availableRooms?(
                    <RoomSearchresults results={availableRooms} onClearSearch={clearSearch} />
                ):(
                    <p>No rooms available for the selected dates and room type</p>
                )}
                {errorMessage && 
                    <p className='text-danger'>{errorMessage}</p>
                }
            </Container>
        </>
    )
}

export default RoomSearch