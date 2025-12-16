// api/routes/gig.route.js
import express from "express";
import {
  createGig,
  updateGig,
  deleteGig,
  getGig,
  getGigs,
  getMyGigs,
} from "../controllers/gig.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

// Create
router.post("/", verifyToken, createGig);

// Update (EditGig)
router.put("/:id", verifyToken, updateGig);

// Delete
router.delete("/:id", verifyToken, deleteGig);

// My gigs (MyGigs.jsx -> /gigs/mine)
router.get("/mine", verifyToken, getMyGigs);

// Single gig (EditGig + details page)
router.get("/single/:id", getGig);

// All gigs / filtered list
router.get("/", getGigs);

export default router;
