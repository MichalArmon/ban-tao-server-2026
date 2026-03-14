import express from "express";
import Room from "../models/Room.js";

const roomRouter = express.Router();
let rooms = [
  { id: 1, title: "room1", subtitle: "sub room1", likes: [] },

  { id: 2, title: "room2", subtitle: "sub room2", likes: [] },

  { id: 3, title: "room3", subtitle: "sub room3", likes: [] },
];

// ✔️✔️READ✔️✔️
roomRouter.get("/", (req, res) => {
  res.send(rooms);
});

// // ✔️✔️CREATE✔️✔️
// cardRouter.post("/", (req, res) => {
//   const cardID = cards.length + 1;
//   const newCard = { ...req.body, id: cardID };
//   cards.push(newCard);
//   console.log(cards);
//   res.status(201).send("New card added successfully!");
// });

// ✔️✔️CREATE✔️✔️
roomRouter.post("/", async (req, res) => {
  try {
    const newRoom = req.body;
    const newRoomForMongo = new Room(newRoom);
    await newRoomForMongo.save();

    res.status(201).send("New room added successfully!");
  } catch (error) {
    console.log(error);
  }
});

// ✔️✔️GET one by ID✔️✔️

roomRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  // const specificCard = cards.filter((card) => card.id === Number(id));
  const card = cards.find((card) => card.id === Number(id));
  if (card) {
    res.status(200).send(card);
  } else {
    res.status(404).send("Card not found!");
  }
});

// ✔️✔️UPDATE✔️✔️

roomRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const card = cards.find((card) => card.id === Number(id));
  const updatedCard = { ...card, ...req.body };
  cards = cards.map((card) => (card.id.toString() === id ? updatedCard : card));
  if (updatedCard) {
    res.send(cards);
  } else {
    res.status(404).send("Card not found!");
  }
});

// ✔️✔️DELETE✔️✔️
roomRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  const card = cards.find((card) => card.id === Number(id));
  if (card) {
    cards = cards.filter((card) => card.id !== Number(id));
    res.status(200).send(cards);
  } else {
    res.status(400).send("Couldn't delete card! Card not found!");
  }
});

export default roomRouter;
