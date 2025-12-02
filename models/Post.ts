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
      required: false,
    },
    // YYYYMMDD
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
    //YYYYMMDD로 저장
    createdKey: {
      type: Number,
      required: true,
      index: true,
    },
    updatedKey: {
      type: Number,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        if (ret.updatedAt) {
          const d = new Date(ret.updatedAt);
          const yyyy = d.getUTCFullYear();
          const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
          const dd = String(d.getUTCDate()).padStart(2, "0");
          ret.displayDate = `${yyyy}${mm}${dd}`; // YYYYMMDD from updatedAt
        }
        return ret;
      },
    },
    toObject: {
      transform: (_doc, ret) => {
        if (ret.updatedAt) {
          const d = new Date(ret.updatedAt);
          const yyyy = d.getUTCFullYear();
          const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
          const dd = String(d.getUTCDate()).padStart(2, "0");
          ret.displayDate = `${yyyy}${mm}${dd}`;
        }
        return ret;
      },
    },
  }
);

PostSchema.pre("save", function (next) {
  try {
    const doc = this as unknown as PostDocument;
    const created = doc.createdAt ? new Date(doc.createdAt) : new Date();
    const updated = doc.updatedAt ? new Date(doc.updatedAt) : new Date();

    const makeKey = (d: Date) =>
      Number(
        `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(
          2,
          "0"
        )}${String(d.getUTCDate()).padStart(2, "0")}`
      );

    doc.createdKey = makeKey(created);
    doc.updatedKey = makeKey(updated);
    next();
  } catch (e) {
    next(e as Error);
  }
});

export interface PostDocument extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  date: Date;
  feeling: string;
  title: string;
  content: string;
  dateKey: number;
  createdKey: number;
  updatedKey: number;
  createdAt: Date;
  updatedAt: Date;
}

const PostModel =
  (mongoose.models.Post as mongoose.Model<PostDocument>) ||
  mongoose.model<PostDocument>("Post", PostSchema);
export default PostModel;
