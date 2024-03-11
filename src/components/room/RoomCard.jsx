import React from "react";
import PropTypes from "prop-types";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
    console.log("Room Object:", room); // Add this line
  return (
    <Col key={room.id} className="mb-4" xs={12}>
      <Card>
        <Card.Body className="d-flex flex-wrap align-items-center">
          <div className="flex-shrrink-0 mr-3 mb-3 mb-md-0">
            <Link to={`/book-room/${room.id}`}>
              <Card.Img
                variant="top"
                src={room?.photoUrls?.[0]}
                alt="Room Photo"
                style={{ width: "100%", maxWidth: "200px", height: "auto" }}
              />
            </Link>
          </div>
          <div className="flex-grow-1 ml-3 px-5">
            <Card.Title className="hotel-color">{room.roomType}</Card.Title>
            <Card.Title className="room-price">{room.roomPrice} / night</Card.Title>
            <Card.Text>Some room information goes here for the guest to read through</Card.Text>
          </div>
          <div className="flex-shrink-0 mt-3">
            <Link to={`/book-room/${room.id}`} className="btn btn-hotel btn-sm">
              Book Now
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

RoomCard.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.number.isRequired,
    photoUrls: PropTypes.arrayOf(PropTypes.string).isRequired, // Assuming 'photo' is a base64-encoded string
    roomType: PropTypes.string.isRequired,
    roomPrice: PropTypes.number.isRequired,
    // Add other properties as needed
  }).isRequired,
};

export default RoomCard;
