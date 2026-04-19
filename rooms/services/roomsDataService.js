import Room from "../models/Room.js";

// 📊📊get all📊📊
export const getAllRooms = async () => {
  try {
    const rooms = await Room.find().lean();
    return rooms;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 📊📊get one by id📊📊
export const getOneById = async (id) => {
  try {
    const room = await Room.findById(id);
    return room;
  } catch (error) {
    console.log(error);
    return null;
  }
};
// 📊📊get one by slug📊📊
export const getOneBySlug = async (slug) => {
  try {
    const room = await Room.findOne({ slug: slug });
    return room;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 📊📊create📊📊
export const createRoom = async (newRoom) => {
  try {
    const newRoomForDb = new Room(newRoom);
    await newRoomForDb.save();
    return newRoomForDb;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// 📊📊update📊📊
export const updateRoom = async (id, payload) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(id, payload, {
      new: true,
    });
    return updatedRoom;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// 📊📊delete📊📊
export const deleteRoom = async (id) => {
  try {
    await Room.findByIdAndDelete(id);
    return id;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
