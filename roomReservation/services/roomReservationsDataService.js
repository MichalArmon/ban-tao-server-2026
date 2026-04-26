import Order from "../../orders/models/Order.js";
import RoomReservation from "../models/RoomReservation.js";

// 📊📊get all📊📊
export const getAllRoomReservations = async () => {
  try {
    const roomReservations = await RoomReservation.find().lean();
    return roomReservations;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 📊📊get one by id📊📊
export const getOneById = async (id) => {
  try {
    const roomReservation = await RoomReservation.findById(id);
    return roomReservation;
  } catch (error) {
    console.log(error);
    return null;
  }
};
// 📊📊create📊📊
export const createRoomReservation = async (newRoomReservation) => {
  try {
    const newRoomReservationForDb = RoomReservation.create(newRoomReservation);

    return newRoomReservationForDb;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// 📊📊update📊📊
export const updateRoomReservation = async (id, payload) => {
  try {
    const updatedRoomReservation = await RoomReservation.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
      },
    );
    return updatedRoomReservation;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// 📊📊delete📊📊
export const deleteRoomReservation = async (id) => {
  try {
    await Order.updateMany(
      { roomReservations: id },
      { $pull: { roomReservations: id } },
    );
    await RoomReservation.findByIdAndDelete(id);

    return id;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
