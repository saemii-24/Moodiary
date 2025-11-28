import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    // YYYYMMDD numeric day key (e.g. 20251128) for easy exact-match queries
    dateKey: {
      type: Number,
      required: true,
      index: true,
    },
    feeling: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        return ret;
      },
    },
    toObject: {
      transform: (_doc, ret) => {
        return ret;
      },
    },
  }
);

export interface PostDocument extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  date: Date;
  feeling: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const PostModel =
  (mongoose.models.Post as mongoose.Model<PostDocument>) ||
  mongoose.model<PostDocument>("Post", PostSchema);
export default PostModel;
