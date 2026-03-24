import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getOneById,
  updateRoom,
} from "./roomsDataService.js";

// 📊📉get all📊📉
export const getAllRoomsService = async () => {
  try {
    const rooms = await getAllRooms();
    return rooms;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 📊📉get one by id📊📉
export const getOneByIdService = async (id) => {
  try {
    const room = await getOneById(id);
    return room;
  } catch (error) {
    console.log(error);
    return null;
  }
};
// 📊📉create📊📉
export const createRoomService = async (newRoom) => {
  try {
    const newRoomForController = await createRoom(newRoom);
    return newRoomForController;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 📊📉update📊📉
export const updateRoomService = async (id, payload) => {
  try {
    const updatedRoom = await updateRoom(id, payload);
    return updatedRoom;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 📊📉delete📊📉
export const deleteRoomService = async (id) => {
  try {
    await deleteRoom(id);
    return id;
  } catch (error) {
    console.log(error);
    return null;
  }
};
