import { createOrderService } from "../../orders/services/ordersService.js";
import Room from "../../rooms/models/Room.js";
import {
  createRoomReservation,
  deleteRoomReservation,
  getAllRoomReservations,
  getOneById,
  updateRoomReservation,
} from "./roomReservationsDataService.js";

// 💼💼get all💼💼
export const getAllRoomReservationsService = async () => {
  try {
    const roomReservations = await getAllRoomReservations();
    return roomReservations;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 💼💼get one by id💼💼
export const getOneByIdService = async (id) => {
  try {
    const roomReservation = await getOneById(id);
    return roomReservation;
  } catch (error) {
    console.log(error);
    return null;
  }
};
// 💼💼create💼💼
export const createRoomReservationService = async (newRoomReservation) => {
  const expiresInMinutes = 10;
  const { userId, RoomId } = newRoomReservation;
  try {
    console.log("before createRoomReservation", {
      ...newRoomReservation,
      expiresAt: new Date(Date.now() + expiresInMinutes * 60 * 1000),
    });
    const newRoomReservationForController = await createRoomReservation({
      ...newRoomReservation,

      expiresAt: new Date(Date.now() + expiresInMinutes * 60 * 1000),
    });

    const newEnrolledUsers = { userId: userId, joinedAt: new Date() };
    await Room.findByIdAndUpdate(
      RoomId,
      {
        $push: { enrolledUsers: newEnrolledUsers },
      },
      { new: true },
    );
    return newRoomReservationForController;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 💼💼update💼💼
// export const updateRoomReservationService = async (id, payload) => {
//   try {
//     const existingReservation = await getOneById(id);
//     const wasConfirmed = existingReservation.status === "confirmed";

//     const updatedRoomReservation = await updateRoomReservation(id, payload);

//     // 👇 הוספנו הדפסות כדי לראות מה המצב האמיתי
//     console.log("--- DEBUG ROOM RESERVATION ---");
//     console.log("wasConfirmed (Old Status):", wasConfirmed);
//     console.log("New Status:", updatedRoomReservation.status);

//     if (!wasConfirmed && updatedRoomReservation.status === "confirmed") {
//       console.log("Condition met! Calling createOrderService...");
//       await createOrderService(updatedRoomReservation, "room");
//     } else {
//       console.log("Condition NOT met! Skipping order creation.");
//     }

//     return updatedRoomReservation;
//   } catch (error) {
//     console.log("Error in updateRoomReservationService:", error);
//     throw error;
//   }
// };
export const updateRoomReservationService = async (id, payload) => {
  try {
    const existingReservation = await getOneById(id);

    const wasConfirmed = existingReservation.status === "confirmed";

    const updatedRoomReservation = await updateRoomReservation(id, payload);

    if (!wasConfirmed && updatedRoomReservation.status === "confirmed") {
      await createOrderService(updatedRoomReservation, "room");
    }

    return updatedRoomReservation;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 💼💼delete💼💼
export const deleteRoomReservationService = async (id) => {
  try {
    await deleteRoomReservation(id);
    return id;
  } catch (error) {
    console.log(error);
    return null;
  }
};
