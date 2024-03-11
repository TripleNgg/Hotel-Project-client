import axios from "axios";

export const api = axios.create({
    baseURL: "https://hotel-project-3mft.onrender.com"
});

export const getHeader = ()=> {
    const token = localStorage.getItem("token")
    return {
        Authorization: `Bearer ${token}`,
        "Content-type": "applicaiton/json" 
    }
}

export async function addRoom(photos, roomType, roomPrice) {
    const formData = new FormData();

    for (let i = 0; i < photos.length; i++) {
        formData.append('photo', photos[i]);
    }
    formData.append("roomType", roomType);
    formData.append("roomPrice", roomPrice);

    try {
        const response = await api.post("/api/rooms/v1/add/new-room", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (response.status === 200) {
            return true;
        }

        return false;
    } catch (error) {
        console.error("Error adding room:", error);
        return false;
    }
}



export async function getRoomTypes(){
    try{
        const response = await api.get("/api/rooms/v1/room-types");
        return response.data;
    }catch{
        throw new Error("Error fetching room types");
    }
    
}

export async function getAllRooms(){
    try{
        const results = api.get("/api/rooms/v1/all-rooms");
        return (await results).data;
    }catch(e){
        throw new Error("Error fetching room!");
    }
}

export async function deleteRoom(roomId){
    try{
        const result = await api.delete("/api/rooms/v1/"+roomId);
        console.log(result.data)
        return result.data;
    }catch(e){
        console.log(e.message)
        throw new Error(`Error deleting room: ${e.message}`);
    }
}
export async function updateRoom(roomId, photos, roomType, roomPrice) {
    const formData = new FormData();

    for (let i = 0; i < photos.length; i++) {
        formData.append('photo', photos[i]);
    }
    formData.append("roomType", roomType);
    formData.append("roomPrice", roomPrice);
    
    try {
        const response = await api.put(`/api/rooms/v1/${roomId}`, formData);
        return response.data; // Assuming the response contains data
    } catch (error) {
        console.error('Error updating room:', error);
        throw error; // Handle the error appropriately
    }
}
export async function getRoomById(roomId) {
    try{
        const room = await api.get("/api/rooms/v1/"+roomId)
        return room.data
    }catch(e){
        throw new Error(`Error getting room: ${e.message}`)
    }
}

export async function bookRoom(roomId,booking){
    try{
        const response = await api.post("/api/booking/v1/room/"+roomId,booking)
        return response.data
    }catch(e){
        if(e.response && e.response.data){
            throw new Error(e.response.data);
        }else{
            throw new Error(`Error booking room: ${e.message}`)
        }
    }
}

export async function getAllBooking(){
    try{
        const result = await api.get("api/booking/v1/all-bookings")
        return result.data

    }catch(e){
        throw new Error(`Error fetching booking: ${e.message}`)
    }
}

export async function getBookingByConfirmationCode(confirmationCode){
    try{
        const result = await api.get(`api/booking/v1/confirmation/${confirmationCode}`)
        return result.data
    }catch(e){
        if(e.response && e.response.data){
            throw new Error(e.response.data);
        }else{
            throw new Error(`Error find booking: ${e.message}`)
        }
    }
}

export async function cancelBooking(bookingId){
    try{
        const result = await api.delete(`api/booking/v1/${bookingId}`)
        return result.data
    }catch(e){
        throw new Error(`Error canceling booking: ${e.message}`)
    }
}

export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
    try {
        const res = await api.get(`api/rooms/v1/available-rooms/${roomType}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`);
        return res.data;
    } catch (error) {
        throw new Error("Error: " + error.message);
    }
}

export async function registerUser(registration){
    try {
        const res = await api.post("/api/auth/v1/register-user",registration)
        return res.data
    } catch (error) {
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        }else{
            throw new Error(`User registration error: ${error.message}`)
        }
    }
}

export async function loginUser(loginRequest){
    try {
        const response = await api.post("/api/auth/v1/login",loginRequest)
        if(response.status >= 200 && response.status <= 300){
            return response.data
        }else{
            return null
        }
    } catch (error) {
        console.log(error.message)
        return null
    }
}
export async function getUserProfile(userId,token){
    try {
        const response = await api.get(`/api/users/v1/${userId}`,{
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        throw new Error("Error logging")
    }
}

export async function deleteUser(userId){
    try {
        const response = await api.delete(`/api/users/v1/${userId}`,{
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        return error.message        
    }
}


export async function getUser(userId, token) {
	try {
		const response = await api.get(`/api/users/v1/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw new Error(error.message)
	}
}

export async function getBookingsByUserId(userId,token){
    try {
		const response = await api.get(`/api/users/v1/bookings/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw new Error(error.message)
	}
}





