import mongoose from "mongoose";
const { Schema } = mongoose;

const GigSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    desc: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },

    totalStars: {
      type: Number,
      default: 0,
      min: 0,
    },

    starNumber: {
      type: Number,
      default: 0,
      min: 0,
    },

    cat: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 1,
    },

    cover: {
      type: String,
      required: true,
    },

    images: {
      type: [String],
      default: [],
    },

    shortTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    shortDesc: {
      type: String,
      default: "",
      trim: true,
      maxlength: 150,
    },

    deliveryTime: {
      type: Number,
      required: true,
      min: 1,
    },

    revisionNumber: {
      type: Number,
      required: true,
      min: 0,
    },

    features: {
      type: [String],
      default: [],
    },

    sales: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Gig", GigSchema);