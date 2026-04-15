import { getOneWorkshopById } from "../../workshops/services/workshopsDataService.js";
import {
  createSession,
  deleteSession,
  getAllSessions,
  getOneById,
  updateSession,
} from "./SessionsDataService.js";

// 💼💼get all💼💼
export const getAllSessionsService = async () => {
  try {
    const sessions = await getAllSessions();
    return sessions;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 💼💼get one by id💼💼
export const getOneByIdService = async (id) => {
  try {
    const session = await getOneById(id);
    return session;
  } catch (error) {
    console.log(error);
    return null;
  }
};
// 💼💼create💼💼
export const createSessionService = async (newSession) => {
  try {
    const workshop = await getOneWorkshopById(newSession.workshopId);

    const startTime = new Date(newSession.startTime);
    const duration = workshop.duration;
    const endTime = new Date(startTime.getTime() + duration * 60 * 1000);
    const newSessionForController = await createSession({
      ...newSession,
      endTime: endTime,
    });
    return newSessionForController;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 💼💼update💼💼
export const updateSessionService = async (id, payload) => {
  try {
    const updatedSession = await updateSession(id, payload);
    return updatedSession;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 💼💼delete💼💼
export const deleteSessionService = async (id) => {
  try {
    await deleteSession(id);
    return id;
  } catch (error) {
    console.log(error);
    return null;
  }
};
