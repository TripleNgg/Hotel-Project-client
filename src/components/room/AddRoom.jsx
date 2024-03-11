import React, { useState } from "react"
import { addRoom } from "../utils/ApiFunctions"
import RoomTypeSelector from "../common/RoomTypeSelector"
import { Link } from "react-router-dom"

const AddRoom = () => {
	const [newRoom, setNewRoom] = useState({
		photo: null,
		roomType: "",
		roomPrice: ""
	})

	const [successMessage, setSuccessMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const [imagePreview, setImagePreview] = useState("")

	const handleRoomInputChange = (e) => {
		const name = e.target.name
		let value = e.target.value
		if (name === "roomPrice") {
			if (!isNaN(value)) {
				value = parseInt(value)
			} else {
				value = ""
			}
		}
		setNewRoom({ ...newRoom, [name]: value })
	}

    const handleImageChange = (e) => {
        const selectedImages = e.target.files;
        setNewRoom({ ...newRoom, photo: selectedImages });
    
        // Display image previews
        const imagePreviewUrls = [];
        for (let i = 0; i < selectedImages.length; i++) {
            imagePreviewUrls.push(URL.createObjectURL(selectedImages[i]));
        }
        setImagePreview(imagePreviewUrls);
      };

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const response = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice)
			if (response) {
				setSuccessMessage("A new room was  added successfully !")
				setNewRoom({ photo: null, roomType: "", roomPrice: "" })
				setImagePreview("")
				setErrorMessage("")
			} else {
				setErrorMessage("Error adding new room")
			}
		} catch (error) {
			setErrorMessage(error.message)
		}
		setTimeout(() => {
			setSuccessMessage("")
			setErrorMessage("")
		}, 3000)
	}

	return (
		<>
			<section className="container mt-5 mb-5">
				<div className="row justify-content-center">
					<div className="col-md-8 col-lg-6">
						<h2 className="mt-5 mb-2">Add a New Room</h2>
						{successMessage && (
							<div className="alert alert-success fade show"> {successMessage}</div>
						)}

						{errorMessage && <div className="alert alert-danger fade show"> {errorMessage}</div>}

						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								<label htmlFor="roomType" className="form-label">
									Room Type
								</label>
								<div>
									<RoomTypeSelector
										handleRoomInputChange={handleRoomInputChange}
										newRoom={newRoom}
									/>
								</div>
							</div>
							<div className="mb-3">
								<label htmlFor="roomPrice" className="form-label">
									Room Price
								</label>
								<input
									required
									type="number"
									className="form-control"
									id="roomPrice"
									name="roomPrice"
									value={newRoom.roomPrice}
									onChange={handleRoomInputChange}
								/>
							</div>

							<div className="mb-3">
								<label htmlFor="photo" className="form-label">
									Room Photo
								</label>
								<input
									required
									name="photo"
									id="photo"
									type="file"
									className="form-control"
									onChange={handleImageChange}
                                    multiple
								/>
								{Array.isArray(imagePreview) && imagePreview.length > 0 && (
                                    <div>
                                    {imagePreview.map((image, index) => (
                                        <img
                                        key={index}
                                        src={image}
                                        alt={`Room preview ${index + 1}`}
                                        style={{ maxWidth: "400px", maxHeight: "400px" }}
                                        className="mt-3"
                                        />
                                    ))}
                                    </div>
                                )}
							</div>
							<div className="d-grid gap-2 d-md-flex mt-2">
								<Link to={"/existing-rooms"} className="btn btn-outline-info">
									Existing rooms
								</Link>
								<button type="submit" className="btn btn-outline-primary ml-5">
									Save Room
								</button>
							</div>
						</form>
					</div>
				</div>
			</section>
		</>
	)
}

export default AddRoom