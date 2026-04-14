import {
  createTreatment,
  deleteTreatment,
  getAllTreatments,
  getOneTreatmentById,
  updateTreatment,
} from "./treatmentsDataService.js";

// 💼💼get all💼💼
export const getAllTreatmentsService = async () => {
  try {
    const treatments = await getAllTreatments();
    return treatments;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 💼💼get one by id💼💼
export const getOneByIdService = async (id) => {
  try {
    const treatment = await getOneTreatmentById(id);
    return treatment;
  } catch (error) {
    console.log(error);
    return null;
  }
};
// 💼💼create💼💼
export const createTreatmentService = async (newTreatment) => {
  try {
    const newTreatmentForController = await createTreatment(newTreatment);
    return newTreatmentForController;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 💼💼update💼💼
export const updateTreatmentService = async (id, payload) => {
  try {
    const updatedTreatment = await updateTreatment(id, payload);
    return updatedTreatment;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 💼💼delete💼💼
export const deleteTreatmentService = async (id) => {
  try {
    await deleteTreatment(id);
    return id;
  } catch (error) {
    console.log(error);
    return null;
  }
};
