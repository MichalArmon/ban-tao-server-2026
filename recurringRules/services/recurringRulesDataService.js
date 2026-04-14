import RecurringRule from "../models/RecurringRule.js";

// 📊📊get all📊📊
export const getAllRecurringRules = async () => {
  try {
    const recurringRules = await RecurringRule.find().lean();
    return recurringRules;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 📊📊get one by id📊📊
export const getOneById = async (id) => {
  try {
    const recurringRule = await RecurringRule.findById(id);
    return recurringRule;
  } catch (error) {
    console.log(error);
    return null;
  }
};
// 📊📊create📊📊
export const createRecurringRule = async (newRecurringRule) => {
  try {
    const newRecurringRuleForDb = new RecurringRule(newRecurringRule);
    await newRecurringRuleForDb.save();
    return newRecurringRuleForDb;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// 📊📊update📊📊
export const updateRecurringRule = async (id, payload) => {
  try {
    const updatedRecurringRule = await RecurringRule.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
      },
    );
    return updatedRecurringRule;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// 📊📊delete📊📊
export const deleteRecurringRule = async (id) => {
  try {
    await RecurringRule.findByIdAndDelete(id);
    return id;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
