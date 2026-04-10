import {
  createWorkshop,
  deleteWorkshop,
  getAllWorkshops,
  getOneById,
  updateWorkshop,
} from "./workshopsDataService.js";

// 💼💼get all💼💼
export const getAllWorkshopsService = async () => {
  try {
    const workshops = await getAllWorkshops();
    return workshops;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 💼💼get one by id💼💼
export const getOneByIdService = async (id) => {
  try {
    const workshop = await getOneById(id);
    return workshop;
  } catch (error) {
    console.log(error);
    return null;
  }
};
// 💼💼create💼💼
export const createWorkshopService = async (newWorkshop) => {
  try {
    const newWorkshopForController = await createWorkshop(newWorkshop);
    return newWorkshopForController;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 💼💼update💼💼
export const updateWorkshopService = async (id, payload) => {
  try {
    const updatedWorkshop = await updateWorkshop(id, payload);
    return updatedWorkshop;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 💼💼delete💼💼
export const deleteWorkshopService = async (id) => {
  try {
    await deleteWorkshop(id);
    return id;
  } catch (error) {
    console.log(error);
    return null;
  }
};
