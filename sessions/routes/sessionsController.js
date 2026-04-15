import express from "express";
import {
  createSessionService,
  deleteSessionService,
  getAllSessionsService,
  getOneByIdService,
  updateSessionService,
} from "../services/sessionsService.js";
import Session from "../models/Session.js";

const sessionRouter = express.Router();

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

// ✔️✔️RECURSIVE✔️✔️
sessionRouter.post("/recursive", async (req, res) => {
  try {
    const {
      workshopId,
      startDate,
      endDate,
      daysOfWeek,
      hour,
      location,
      maxCapacity,
    } = req.body;
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

          isRecursive: true,
          startDate,
          endDate,
          daysOfWeek,
          hour,
        });
        createdSessions.push(newSession);
      }
      current.setDate(current.getDate() + 1);
    }

    res.status(201).json({
      message: `הצלחנו! נוצרו ${createdSessions.length} סשנים בלוח הזמנים.`,
      sessions: createdSessions,
    });
  } catch (error) {
    console.error("Error creating recursive sessions:", error);
    res.status(500).json({ error: error.message });
  }
});

export default sessionRouter;
