import Order from "../../orders/models/Order.js";
import SessionReservation from "../models/SessionReservation.js";

// 📊📊get all📊📊
export const getAllSessionReservations = async () => {
  try {
    const sessionReservations = await SessionReservation.find().lean();
    return sessionReservations;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 📊📊get one by id📊📊
export const getOneById = async (id) => {
  try {
    const sessionReservation = await SessionReservation.findById(id);
    return sessionReservation;
  } catch (error) {
    console.log(error);
    return null;
  }
};
// 📊📊create📊📊
export const createSessionReservation = async (newSessionReservation) => {
  try {
    const newSessionReservationForDb = SessionReservation.create(
      newSessionReservation,
    );

    return newSessionReservationForDb;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// 📊📊update📊📊
export const updateSessionReservation = async (id, payload) => {
  try {
    const updatedSessionReservation =
      await SessionReservation.findByIdAndUpdate(id, payload, {
        new: true,
      });
    return updatedSessionReservation;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// 📊📊delete📊📊
export const deleteSessionReservation = async (id) => {
  try {
    await Order.updateMany(
      { workshopReservations: id },
      { $pull: { workshopReservations: id } },
    );
    await SessionReservation.findByIdAndDelete(id);
    return id;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
