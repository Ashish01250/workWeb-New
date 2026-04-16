import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";


// CREATE GIG
export const createGig = async (req, res, next) => {
  if (!req.isSeller) {
    return next(createError(403, "Only sellers can create a gig!"));
  }

  try {
    const newGig = new Gig({
      ...req.body,
      userId: req.userId,
    });

    const savedGig = await newGig.save();

    return res.status(201).json({
      success: true,
      data: savedGig,
    });

  } catch (err) {
    next(err);
  }
};


// UPDATE GIG
export const updateGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return next(createError(404, "Gig not found"));
    }

    if (!req.isSeller) {
      return next(createError(403, "Only sellers can update gigs"));
    }

    if (gig.userId.toString() !== req.userId) {
      return next(createError(403, "You can edit only your own gig"));
    }

    const allowedUpdates = [
      "title",
      "desc",
      "cat",
      "price",
      "cover",
      "images",
      "shortTitle",
      "shortDesc",
      "deliveryTime",
      "revisionNumber",
      "features",
    ];

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        gig[field] = req.body[field];
      }
    });

    const savedGig = await gig.save();

    return res.status(200).json({
      success: true,
      data: savedGig,
    });

  } catch (err) {
    next(err);
  }
};


// DELETE GIG
export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return next(createError(404, "Gig not found"));
    }

    if (!req.isSeller) {
      return next(createError(403, "Only sellers can delete gigs"));
    }

    if (gig.userId.toString() !== req.userId) {
      return next(createError(403, "You can delete only your own gig"));
    }

    await Gig.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Gig deleted successfully",
    });

  } catch (err) {
    next(err);
  }
};


// GET SINGLE GIG
export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return next(createError(404, "Gig not found"));
    }

    return res.status(200).json({
      success: true,
      data: gig,
    });

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

    return res.status(200).json({
      success: true,
      data: gigs,
    });

  } catch (err) {
    next(err);
  }
};


// GET ALL GIGS
export const getGigs = async (req, res, next) => {
  const q = req.query;

  const filters = {
    ...(q.cat && { cat: { $regex: q.cat, $options: "i" } }),

    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gte: Number(q.min) }),
        ...(q.max && { $lte: Number(q.max) }),
      },
    }),

    ...(q.search && {
      title: { $regex: q.search, $options: "i" },
    }),
  };

  const allowedSortFields = ["createdAt", "price", "sales"];

  const sortField = allowedSortFields.includes(q.sort)
    ? q.sort
    : "createdAt";

  try {
    const gigs = await Gig.find(filters).sort({
      [sortField]: -1,
    });

    return res.status(200).json({
      success: true,
      data: gigs,
    });

  } catch (err) {
    next(err);
  }
};