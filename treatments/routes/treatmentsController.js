import express from "express";
import {
  createTreatmentService,
  deleteTreatmentService,
  getAllTreatmentsService,
  getOneTreatmentByIdService,
  updateTreatmentService,
} from "../services/treatmentsService.js";
import TreatmentReservation from "../../treatmentReservation/models/TreatmentReservation.js";

const treatmentRouter = express.Router();

// ✔️✔️Treatment AVAILABILITY✔️✔️

treatmentRouter.get("/availability", async (req, res) => {
  try {
    const { treatmentId, date, startTime } = req.query;
    const treatment = await getOneTreatmentByIdService(treatmentId);
    if (!treatment) {
      throw new Error("Treatment not found");
    }

    let treatmentFilter = {};
    if (treatmentId) {
      treatmentFilter.treatmentId = treatmentId;
    }
    if (date) {
      treatmentFilter.date = date;
    }
    if (startTime) {
      treatmentFilter.startTime = { $gte: new Date(startTime) };
    }
    const isIceBath = treatment.title === "Ice Bath Session";
    const MAX_CAPACITY = isIceBath ? 4 : 3;

    const existingBookings = await TreatmentReservation.find({
      ...treatmentFilter,
      status: { $ne: "cancelled" },
    }).populate("treatmentId");

    let overlappingCount = 0;
    let bookedMassageRooms = 0;
    existingBookings.forEach((booking) => {
      if (isIceBath && booking.treatmentId.title === "Ice Bath Session") {
        overlappingCount++;
      } else {
        bookedMassageRooms++;
      }
    });
    if (overlappingCount >= MAX_CAPACITY) {
      throw new Error(
        `Sorry, there are no available spots for ${treatment.title} at ${startTime}.`,
      );
    }
    if (bookedMassageRooms >= MAX_CAPACITY) {
      throw new Error(
        `Sorry, there are no available spots for ${treatment.title} at ${startTime}.`,
      );
    }

    return res.status(200);
  } catch (error) {
    console.log("Error in searchAvailableTreatments:", error);
    return res.status(500).send("Server Error");
  }
});

// ✔️✔️Treatment Daily AVAILABILITY✔️✔️
treatmentRouter.get("/daily-availability", async (req, res) => {
  try {
    const { treatmentId, date } = req.query;

    // 1. נמצא את הטיפול המבוקש
    const treatment = await getOneTreatmentByIdService(treatmentId);
    if (!treatment) return res.status(404).send("Treatment not found");

    const isIceBath = treatment.title === "Ice Bath Session";
    const MAX_CAPACITY = isIceBath ? 4 : 3;

    // 2. נגדיר את כל השעות שהספא פתוח בהן (אפשר לשנות לפי הצורך שלך)
    const allWorkingHours = [
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
    ];

    // 3. נשלוף ממונגו את כל ההזמנות של אותו תאריך (בלי לסנן שעה!)
    const existingBookings = await TreatmentReservation.find({
      date: date,
      status: { $ne: "cancelled" },
    }).populate("treatmentId");

    // 4. נכין מערך ריק שאליו נכניס רק את השעות הפנויות
    const availableTimes = [];

    // 5. נעבור שעה-שעה ונבדוק אותה
    allWorkingHours.forEach((hour) => {
      let overlappingCount = 0;

      // נספור כמה הזמנות קיימות ספציפית בשעה הזו (hour)
      existingBookings.forEach((booking) => {
        if (booking.startTime === hour) {
          if (isIceBath && booking.treatmentId.title === "Ice Bath Session") {
            overlappingCount++;
          } else if (
            !isIceBath &&
            booking.treatmentId.title !== "Ice Bath Session"
          ) {
            overlappingCount++;
          }
        }
      });

      // אם לא הגענו למקסימום - השעה הזו פנויה! נדחוף אותה למערך התשובה
      if (overlappingCount < MAX_CAPACITY) {
        availableTimes.push(hour);
      }
    });

    // 6. נחזיר את הרשימה הנקייה לפרונטאנד
    return res.status(200).json({ availableTimes });
  } catch (error) {
    console.log("Error in daily availability:", error);
    return res.status(500).send("Server Error");
  }
});

// ✔️✔️READ✔️✔️
treatmentRouter.get("/", async (req, res) => {
  try {
    const treatments = await getAllTreatmentsService();
    res.status(200).send(treatments);
  } catch (error) {
    console.log(error);
  }
});

// ✔️✔️CREATE✔️✔️
treatmentRouter.post("/", async (req, res) => {
  const newTreatment = req.body;
  try {
    const newTreatmentForMongo = await createTreatmentService(newTreatment);

    res.status(201).send(newTreatmentForMongo);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

// ✔️✔️GET one by ID✔️✔️

treatmentRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const Treatment = await getOneTreatmentByIdService(id);
    res.status(200).send(Treatment);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// ✔️✔️UPDATE✔️✔️

treatmentRouter.put("/:id", async (req, res) => {
  const payload = req.body;
  const { id } = req.params;
  try {
    const updatedTreatment = await updateTreatmentService(id, payload);
    res.status(200).send(updatedTreatment);
  } catch (error) {
    console.log(error);
  }
});

// ✔️✔️DELETE✔️✔️
treatmentRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deleteTreatmentService(id);
    res.status(200).send(id);
  } catch (error) {
    console.log(error);
  }
});

export default treatmentRouter;
