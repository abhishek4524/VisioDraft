import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    course: { type: String, required: true },
    semester: { type: String, required: true },
    branch: { type: String, required: true },
    subject: { type: String, required: true },
    noteType: { type: String, required: true },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
file: [
    {
      type: String,
      required: true
    }
  ],
    approved: {
      type: Boolean,
      default: false,
    },
    downloadCount: {
    type: Number,
    default: 0,
  },
  },
  { timestamps: true }
);

const Note = mongoose.models.Note || mongoose.model("Note", noteSchema);

export default Note;