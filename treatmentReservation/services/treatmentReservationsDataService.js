import TreatmentReservation from "../models/TreatmentReservation.js";

// 📊📊get all📊📊
export const getAllTreatmentReservations = async () => {
  try {
    const treatmentReservations = await TreatmentReservation.find().lean();
    return treatmentReservations;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 📊📊get one by id📊📊
export const getOneById = async (id) => {
  try {
    const treatmentReservation = await TreatmentReservation.findById(id);
    return treatmentReservation;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 📊📊create📊📊
export const createTreatmentReservation = async (newTreatmentReservation) => {
  try {
    const newTreatmentReservationForDb = new TreatmentReservation(
      newTreatmentReservation,
    );
    await newTreatmentReservationForDb.save();
    return newTreatmentReservationForDb;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// 📊📊update📊📊
export const updateTreatmentReservation = async (id, payload) => {
  try {
    const updatedTreatmentReservation =
      await TreatmentReservation.findByIdAndUpdate(id, payload, {
        new: true,
      });
    return updatedTreatmentReservation;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// 📊📊delete📊📊
export const deleteTreatmentReservation = async (id) => {
  try {
    await TreatmentReservation.findByIdAndDelete(id);
    return id;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
