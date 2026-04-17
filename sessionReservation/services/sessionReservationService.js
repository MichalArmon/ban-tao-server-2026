import Session from "../../sessions/models/Session.js";
import {
  createSessionReservation,
  deleteSessionReservation,
  getAllSessionReservations,
  getOneById,
  updateSessionReservation,
} from "./sessionReservationsDataService.js";

// 💼💼get all💼💼
export const getAllSessionReservationsService = async () => {
  try {
    const sessionReservations = await getAllSessionReservations();
    return sessionReservations;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 💼💼get one by id💼💼
export const getOneByIdService = async (id) => {
  try {
    const sessionReservation = await getOneById(id);
    return sessionReservation;
  } catch (error) {
    console.log(error);
    return null;
  }
};
// 💼💼create💼💼
export const createSessionReservationService = async (
  newSessionReservation,
) => {
  const expiresInMinutes = 10;
  const { userId, sessionId } = newSessionReservation;
  try {
    console.log("before createSessionReservation", {
      ...newSessionReservation,
      expiresAt: new Date(Date.now() + expiresInMinutes * 60 * 1000),
    });
    const newSessionReservationForController = await createSessionReservation({
      ...newSessionReservation,

      expiresAt: new Date(Date.now() + expiresInMinutes * 60 * 1000),
    });

    const newEnrolledUsers = { userId: userId, joinedAt: new Date() };
    await Session.findByIdAndUpdate(
      sessionId,
      {
        $push: { enrolledUsers: newEnrolledUsers },
      },
      { new: true },
    );
    return newSessionReservationForController;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 💼💼update💼💼
export const updateSessionReservationService = async (id, payload) => {
  try {
    const updatedSessionReservation = await updateSessionReservation(
      id,
      payload,
    );
    return updatedSessionReservation;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 💼💼delete💼💼
export const deleteSessionReservationService = async (id) => {
  try {
    await deleteSessionReservation(id);
    return id;
  } catch (error) {
    console.log(error);
    return null;
  }
};
