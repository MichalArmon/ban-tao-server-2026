import { getOneTreatmentById } from "../../treatments/services/treatmentsDataService.js";

import {
  createTreatmentReservation,
  deleteTreatmentReservation,
  getAllTreatmentReservations,
  getOneById,
  updateTreatmentReservation,
} from "./treatmentReservationsDataService.js";

// 💼💼get all💼💼
export const getAllTreatmentReservationsService = async () => {
  try {
    const treatmentReservations = await getAllTreatmentReservations();
    return treatmentReservations;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 💼💼get one by id💼💼
export const getOneByIdService = async (id) => {
  try {
    const treatmentReservation = await getOneById(id);
    return treatmentReservation;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 💼💼create💼💼
export const createTreatmentReservationService = async (
  newTreatmentReservation,
) => {
  try {
    const treatmentId = newTreatmentReservation.treatmentId;
    const treatment = await getOneTreatmentById(treatmentId);

    const newTreatmentReservationForController = {
      ...newTreatmentReservation,
      priceAtBooking: treatment.price,
      durationAtBooking: treatment.duration,
    };
    const finalTreatmentReservation = await createTreatmentReservation(
      newTreatmentReservationForController,
    );
    return finalTreatmentReservation;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 💼💼update💼💼
export const updateTreatmentReservationService = async (id, payload) => {
  try {
    const updatedTreatmentReservation = await updateTreatmentReservation(
      id,
      payload,
    );
    return updatedTreatmentReservation;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 💼💼delete💼💼
export const deleteTreatmentReservationService = async (id) => {
  try {
    await deleteTreatmentReservation(id);
    return id;
  } catch (error) {
    console.log(error);
    return null;
  }
};
