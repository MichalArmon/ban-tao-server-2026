import Session from "../../sessions/models/Session.js";
import { createSessionService } from "../../sessions/services/sessionsService.js";
import {
  createRecurringRule,
  deleteRecurringRule,
  getAllRecurringRules,
  getOneById,
  updateRecurringRule,
} from "./recurringRulesDataService.js";

// פונקציית עזר: מקבלת נתונים של חוק ואת ה-ID שלו, ומייצרת את הסשנים
const generateSessionsForRule = async (ruleData, ruleId) => {
  const {
    startDate,
    endDate,
    daysOfWeek,
    hour,
    workshopId,
    location,
    maxCapacity,
  } = ruleData;

  let current = new Date(startDate);
  const end = new Date(endDate);
  const createdSessions = [];

  while (current <= end) {
    if (daysOfWeek.includes(current.getDay())) {
      const sessionStart = new Date(current);
      const [hh, mm] = hour.split(":");
      sessionStart.setHours(parseInt(hh), parseInt(mm), 0);

      const newSession = await createSessionService({
        workshopId,
        startTime: sessionStart,
        location,
        maxCapacity,
        ruleId: ruleId, // משתמשים ב-ID שקיבלנו
      });

      createdSessions.push(newSession);
    }
    current.setDate(current.getDate() + 1);
  }

  return createdSessions;
};

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

    // 2. קוראים לפונקציית העזר לייצור הסשנים
    const createdSessions = await generateSessionsForRule(data, newRule._id);

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
    await Session.deleteMany({ ruleId: id });
    const createdSessions = await generateSessionsForRule(
      updatedRecurringRule,
      id,
    );
    return {
      rule: updatedRecurringRule,
      sessionsCount: createdSessions.length,
    };
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
