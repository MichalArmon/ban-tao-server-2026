import Treatment from "../models/Treatment.js";

// 📊📊get all📊📊
export const getAllTreatments = async () => {
  try {
    const treatments = await Treatment.find().lean();
    return treatments;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 📊📊get one by id📊📊
export const getOneTreatmentById = async (id) => {
  try {
    const treatment = await Treatment.findById(id);
    return treatment;
  } catch (error) {
    console.log(error);
    return null;
  }
};
// 📊📊create📊📊
export const createTreatment = async (newTreatment) => {
  try {
    const newTreatmentForDb = new Treatment(newTreatment);
    await newTreatmentForDb.save();
    return newTreatmentForDb;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// 📊📊update📊📊
export const updateTreatment = async (id, payload) => {
  try {
    const updatedTreatment = await Treatment.findByIdAndUpdate(id, payload, {
      new: true,
    });
    return updatedTreatment;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 📊📊delete📊📊
export const deleteTreatment = async (id) => {
  try {
    await Treatment.findByIdAndDelete(id);
    return id;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
