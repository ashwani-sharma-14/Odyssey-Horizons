import mongoose from "mongoose";

const querySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: true,
    },
    preferredDate: {
      type: Date,
      required: true,
    },
    message: String,
    status: {
      type: String,
      enum: ["pending", "contacted", "resolved"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Query", querySchema);
