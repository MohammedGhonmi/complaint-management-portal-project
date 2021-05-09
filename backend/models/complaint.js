const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const complaintSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [6, "Title must be at least 6, got {VALUE}"],
      maxlength: 50,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["pending", "resolved", "dismissed"],
        message: "{VALUE} is not supported",
      },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Complaint = mongoose.model("Complaint", complaintSchema);
module.exports = Complaint;
