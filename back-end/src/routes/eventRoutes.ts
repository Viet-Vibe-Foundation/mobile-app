import { Router } from "express";
import EventService from "../services/eventService";

const router = Router();

router.get("/", EventService.getEvents);
router.get("/:eventId", EventService.getEventById);

export default router;
