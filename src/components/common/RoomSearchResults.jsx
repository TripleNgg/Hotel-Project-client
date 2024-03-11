import React, { useState } from 'react'
import PropTypes from 'prop-types';
import RoomCard from '../room/RoomCard';
import { Button, Row } from 'react-bootstrap';
import RoomPaginator from './RoomPaginator';

const RoomSearchresults = ({results,onClearSearch}) => {
    const[currentPage,setCurrentPage] = useState(1)
    const[resultsPerPage,setresultsPerPage] = useState(3)
    const totalresults = results.length
    const totalPages = Math.ceil(totalresults/resultsPerPage)

    const handlePageChange = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }
    const startIndex = (currentPage-1)*resultsPerPage
    const endIndex = startIndex + results
    const paginatedResult = results.slice(startIndex,endIndex)


    return (
        <>
            {results.length > 0 ?(
                <>
                    <h5 className='text-center mt-5'>Search Result</h5>
                    <Row>
                        {paginatedResult.map((room)=>(
                            <RoomCard key={room.id} room={room} />
                        ))}
                    </Row>

                    <Row>
                            {totalresults > resultsPerPage && (
                                <RoomPaginator
                                 currentPage={currentPage}
                                 totalPages={totalPages} 
                                onPageChange={handlePageChange}/>
                            )}
                            <Button variant='secondary' onClick={onClearSearch}>
                                Clear Search
                            </Button>
                    </Row>
                </>
            ):(
                <p></p>
            )}
            
        </>
    )
}

RoomSearchresults.PropTypes = {
    results:PropTypes.array.isRequired,
    onClearSearch:PropTypes.func.isRequired
}

export default RoomSearchresults