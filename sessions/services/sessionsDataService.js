import Session from "../models/Session.js";

// 📊📊get all📊📊
export const getAllSessions = async () => {
  try {
    const sessions = await Session.find().lean();
    return sessions;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 📊📊get one by id📊📊
export const getOneById = async (id) => {
  try {
    const session = await Session.findById(id);
    return session;
  } catch (error) {
    console.log(error);
    return null;
  }
};
// 📊📊create📊📊
export const createSession = async (newSession) => {
  try {
    const newSessionForDb = new Session(newSession);
    await newSessionForDb.save();
    return newSessionForDb;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// 📊📊update📊📊
export const updateSession = async (id, payload) => {
  try {
    const updatedSession = await Session.findByIdAndUpdate(id, payload, {
      new: true,
    });
    return updatedSession;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 📊📊delete📊📊
export const deleteSession = async (id) => {
  try {
    await Session.findByIdAndDelete(id);
    return id;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
