import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOneById,
  updateOrder,
} from "./ordersDataService.js";

// 💼💼get all💼💼
export const getAllOrdersService = async () => {
  try {
    const orders = await getAllOrders();
    return orders;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 💼💼get one by id💼💼
export const getOneByIdService = async (id) => {
  try {
    const order = await getOneById(id);
    return order;
  } catch (error) {
    console.log(error);
    return null;
  }
};
// 💼💼create💼💼
export const createOrderService = async (newOrder) => {
  try {
    const newOrderForController = await createOrder(newOrder);
    return newOrderForController;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 💼💼update💼💼
export const updateOrderService = async (id, payload) => {
  try {
    const updatedOrder = await updateOrder(id, payload);
    return updatedOrder;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 💼💼delete💼💼
export const deleteOrderService = async (id) => {
  try {
    await deleteOrder(id);
    return id;
  } catch (error) {
    console.log(error);
    return null;
  }
};
