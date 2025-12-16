// api/controllers/gig.controller.js
import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";

// CREATE GIG
export const createGig = async (req, res, next) => {
  if (!req.isSeller) {
    return next(createError(403, "Only sellers can create a gig!"));
  }

  const newGig = new Gig({
    ...req.body,
    userId: req.userId,
  });

  try {
    const savedGig = await newGig.save();
    return res.status(201).json(savedGig);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: err.message,
        errors: err.errors,
      });
    }
    next(err);
  }
};

// UPDATE GIG
export const updateGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(404, "Gig not found"));

    if (gig.userId.toString() !== req.userId) {
      return next(createError(403, "You can edit only your own gig"));
    }

    Object.assign(gig, req.body);
    const savedGig = await gig.save();

    return res.status(200).json(savedGig);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: err.message,
        errors: err.errors,
      });
    }
    next(err);
  }
};

// DELETE GIG
export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(404, "Gig not found!"));

    if (gig.userId.toString() !== req.userId) {
      return next(createError(403, "You can delete only your gig!"));
    }

    await Gig.findByIdAndDelete(req.params.id);
    return res.status(200).send("Gig has been deleted!");
  } catch (err) {
    next(err);
  }
};

// GET SINGLE GIG
export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(404, "Gig not found!"));

    return res.status(200).json(gig);
  } catch (err) {
    next(err);
  }
};

// GET MY GIGS
export const getMyGigs = async (req, res, next) => {
  try {
    const gigs = await Gig.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    return res.status(200).json(gigs);
  } catch (err) {
    next(err);
  }
};

// GENERAL LISTING (with filters)
export const getGigs = async (req, res, next) => {
  const q = req.query;

  const filters = {
    ...(q.cat && { cat: { $regex: q.cat, $options: "i" } }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.search && {
      title: { $regex: q.search, $options: "i" },
    }),
  };

  try {
    const gigs = await Gig.find(filters).sort({
      [q.sort || "createdAt"]: -1,
    });

    return res.status(200).json(gigs);
  } catch (err) {
    next(err);
  }
};
