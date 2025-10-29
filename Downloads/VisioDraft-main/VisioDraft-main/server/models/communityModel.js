import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const communitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  topic: { type: String, required: true },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  icon: { type: String, default: "👥" },
  joinedUsers: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  ],
  moderators: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  ],
  createdAt: { type: Date, default: Date.now },
});

communitySchema.plugin(mongoosePaginate);

const Community = mongoose.model("Community", communitySchema);
export default Community;
