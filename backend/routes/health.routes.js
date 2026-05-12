import { Router } from "express";
import { getHealth } from "../controllers/health/health.controller.js";

/** Health-check route returning server status. @type {import("express").Router} */
const router = Router();

router.get("/", getHealth);

export default router;
