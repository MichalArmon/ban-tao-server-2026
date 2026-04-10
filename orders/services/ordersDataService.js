import RoomReservation from "../../roomReservation/models/RoomReservation.js";
import Order from "../models/Order.js";

// 📊📊get all📊📊
export const getAllOrders = async () => {
  try {
    const orders = await Order.find().lean();
    return orders;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 📊📊get one by id📊📊
export const getOneById = async (id) => {
  try {
    const order = await Order.findById(id);
    return order;
  } catch (error) {
    console.log(error);
    return null;
  }
};
// 📊📊create📊📊
export const createOrder = async (newOrder) => {
  try {
    const newOrderForDb = Order.create(newOrder);

    const reservationId = newOrder.roomReservations[0];
    if (reservationId) {
      await RoomReservation.findByIdAndUpdate(reservationId, {
        status: "confirmed",
      });
    }

    return newOrderForDb;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// 📊📊update📊📊
export const updateOrder = async (id, payload) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, payload, {
      new: true,
    });
    return updatedOrder;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// 📊📊delete📊📊
export const deleteOrder = async (id) => {
  try {
    await Order.findByIdAndDelete(id);
    return id;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
