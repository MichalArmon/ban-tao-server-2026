import express from "express";
import {
  createSessionService,
  deleteSessionService,
  getAllSessionsService,
  getOneByIdService,
  updateSessionService,
} from "../services/sessionsService.js";
import Session from "../models/Session.js";
import SessionReservation from "../../sessionReservation/models/SessionReservation.js";

const sessionRouter = express.Router();

// ✔️✔️SESSION AVAILABILITY✔️✔️

sessionRouter.get("/availability", async (req, res) => {
  try {
    const { startTime, workshopId } = req.query;

    let sessionFilter = {};
    if (workshopId) {
      sessionFilter.workshopId = workshopId;
    }
    if (startTime) {
      sessionFilter.startTime = { $gte: new Date(startTime) };
    }

    // 1. שולפים את כל הסשנים הפוטנציאליים
    const potentialSessions = await Session.find(sessionFilter);

    // 2. הסינון שלך: בודקים את אורך המערך מול הקיבולת
    const availableSessions = potentialSessions.filter((session) => {
      // אם אין יוזרים בכלל, האורך הוא 0. אחרת, בודקים את אורך המערך
      const enrolledCount = session.enrolledUsers
        ? session.enrolledUsers.length
        : 0;

      // משאירים רק סשנים שבהם כמות הרשומים קטנה מהמקסימום
      return enrolledCount < session.maxCapacity;
    });

    if (!availableSessions.length) {
      return res.status(404).send("All sessions are fully booked!");
    }

    return res.status(200).send(availableSessions);
  } catch (error) {
    console.log("Error in searchAvailableSessions:", error);
    return res.status(500).send("Server Error");
  }
});

// ✔️✔️READ✔️✔️
sessionRouter.get("/", async (req, res) => {
  try {
    const sessions = await getAllSessionsService();
    res.status(200).send(sessions);
  } catch (error) {
    console.log(error);
  }
});

// ✔️✔️CREATE✔️✔️
sessionRouter.post("/", async (req, res) => {
  const newSession = req.body;
  const startTimeDate = newSession.startTime;
  const hour = newSession.hour;

  const sessionStart = new Date(startTimeDate);
  const [hh, mm] = hour.split(":");
  sessionStart.setHours(parseInt(hh), parseInt(mm), 0);
  try {
    const newSessionForMongo = await createSessionService({
      ...newSession,
      startTime: sessionStart,
    });

    res.status(201).send(newSessionForMongo);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

// ✔️✔️GET one by ID✔️✔️

sessionRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const session = await getOneByIdService(id);
    res.status(200).send(session);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// ✔️✔️GET one by workshop✔️✔️
sessionRouter.get("/workshop/:workshopId", async (req, res) => {
  try {
    const { workshopId } = req.params;
    const sessions = await Session.find({
      workshopId: workshopId,
      startTime: { $gte: new Date() },
    }).sort({ startTime: 1 });
    res.status(200).send(sessions);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ✔️✔️UPDATE✔️✔️

sessionRouter.put("/:id", async (req, res) => {
  const payload = req.body;
  const { id } = req.params;
  try {
    const updatedSession = await updateSessionService(id, payload);
    res.status(200).send(updatedSession);
  } catch (error) {
    res.status(404);
    console.log(error);
  }
});

// ✔️✔️DELETE✔️✔️
sessionRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deleteSessionService(id);
    res.status(200).send(id);
  } catch (error) {
    console.log(error);
  }
});

export default sessionRouter;
