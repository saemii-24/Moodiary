import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

// User 스키마 개요:
//  - userId: 로그인에 사용할 고유 식별자 (예: 아이디)
//  - nickname: 화면에 표시할 닉네임
//  - password: bcrypt 해시로 저장 (평문 저장 금지)
//  - timestamps: 자동 생성되는 createdAt / updatedAt 필드

const roundsEnv = process.env.BCRYPT_ROUNDS;
const SALT_ROUNDS = roundsEnv ? Number(roundsEnv) : 10; // default 10

const UserSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true, trim: true },
    nickname: { type: String, required: true, trim: true },
    password: { type: String, required: true }, // hashed
  },
  {
    timestamps: true, // createdAt, updatedAt 자동 생성
    //API 응답 직전 어떤 활동을 할지 정의
    // toJSON: {
    //   transform: (_doc, ret) => {
    //     delete ret.password; //응답 직전에 Password 필드 제거
    //     return ret;
    //   },
    // },
    // toObject: {
    //   transform: (_doc, ret) => {
    //     delete ret.password;
    //     return ret;
    //   },
    // },
  }
);

// 비밀번호가 새로 설정되거나 변경된 경우만 해시 수행
UserSchema.pre("save", async function (next) {
  const user = this as mongoose.Document & {
    password: string;
    isModified: (path: string) => boolean;
  };
  if (!user.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (e) {
    next(e as Error);
  }
});

// 평문 비밀번호를 전달하면 저장된 해시와 비교하여 일치 여부 반환
UserSchema.methods.comparePassword = async function (
  candidate: string
): Promise<boolean> {
  const current = (this as mongoose.Document & { password: string }).password;
  return bcrypt.compare(candidate, current);
};

export interface UserDocument extends mongoose.Document {
  userId: string;
  nickname: string;
  password: string; // 해시된 비밀번호
  comparePassword: (candidate: string) => Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const UserModel =
  (mongoose.models.User as mongoose.Model<UserDocument>) ||
  mongoose.model<UserDocument>("User", UserSchema);
export default UserModel;
