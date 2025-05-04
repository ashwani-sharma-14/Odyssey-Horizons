import express from "express";
import {
  createQuery,
  getQueries,
  updateQueryStatus,
} from "../controllers/query.controller.js";

const router = express.Router();

router.post("/", createQuery);
router.get("/", getQueries);
router.patch("/:id/status", updateQueryStatus);

export default router;
