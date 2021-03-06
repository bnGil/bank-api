import express from "express";

import { router as usersRouter } from "./users.js";
import { router as accountsRouter } from "./accounts.js";

export const router = express.Router();

router.get("/", (req, res) => {
  try {
    res.status(200).send("Welcome to V1");
  } catch (err) {
    res.status.send(err.message);
  }
});

router.use("/users", usersRouter);
router.use("/accounts", accountsRouter);
