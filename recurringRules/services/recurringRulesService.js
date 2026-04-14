import { createSessionService } from "../../sessions/services/sessionsService.js";
import {
  createRecurringRule,
  deleteRecurringRule,
  getAllRecurringRules,
  getOneById,
  updateRecurringRule,
} from "./recurringRulesDataService.js";

// 💼💼get all💼💼
export const getAllRecurringRulesService = async () => {
  try {
    const recurringRules = await getAllRecurringRules();
    return recurringRules;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 💼💼get one by id💼💼
export const getOneByIdService = async (id) => {
  try {
    const recurringRule = await getOneById(id);
    return recurringRule;
  } catch (error) {
    console.log(error);
    return null;
  }
};
// 💼💼create💼💼
export const createRecurringRuleService = async (data) => {
  try {
    // 1. שמירת החוק ב-DB
    const newRule = await createRecurringRule(data);

    // 2. לוגיקה ליצירת הסשנים (הלולאה המוכרת שלנו)
    const {
      startDate,
      endDate,
      daysOfWeek,
      hour,
      workshopId,
      location,
      maxCapacity,
    } = data;

    let current = new Date(startDate);
    const end = new Date(endDate);
    const createdSessions = [];

    while (current <= end) {
      if (daysOfWeek.includes(current.getDay())) {
        const sessionStart = new Date(current);
        const [hh, mm] = hour.split(":");
        sessionStart.setHours(parseInt(hh), parseInt(mm), 0);

        // יצירת סשן בודד וקישורו לחוק החדש
        const newSession = await createSessionService({
          workshopId,
          startTime: sessionStart,
          location,
          maxCapacity,
          ruleId: newRule._id, // הנה הקישור!
        });

        createdSessions.push(newSession);
      }
      current.setDate(current.getDate() + 1);
    }

    // מחזירים גם את החוק וגם את כמות הסשנים שנוצרו
    return { rule: newRule, sessionsCount: createdSessions.length };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 💼💼update💼💼
export const updateRecurringRuleService = async (id, payload) => {
  try {
    const updatedRecurringRule = await updateRecurringRule(id, payload);
    return updatedRecurringRule;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 💼💼delete💼💼
export const deleteRecurringRuleService = async (id) => {
  try {
    await deleteRecurringRule(id);
    return id;
  } catch (error) {
    console.log(error);
    return null;
  }
};
