import Workshop from "../models/Workshop.js";

// 💼💼get all💼💼
export const getAllWorkshops = async () => {
  try {
    const workshops = await Workshop.find().lean();
    return workshops;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 💼💼get one by id💼💼
export const getOneById = async (id) => {
  try {
    const workshop = await Workshop.findById(id);
    return workshop;
  } catch (error) {
    console.log(error);
    return null;
  }
};
// 💼💼create💼💼
export const createWorkshop = async (newWorkshop) => {
  try {
    const newWorkshopForDb = new Workshop(newWorkshop);
    await newWorkshopForDb.save();
    return newWorkshopForDb;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// 💼💼update💼💼
export const updateWorkshop = async (id, payload) => {
  try {
    const updatedWorkshop = await Workshop.findByIdAndUpdate(id, payload, {
      new: true,
    });
    return updatedWorkshop;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// 💼💼delete💼💼
export const deleteWorkshop = async (id) => {
  try {
    await Workshop.findByIdAndDelete(id);
    return id;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
