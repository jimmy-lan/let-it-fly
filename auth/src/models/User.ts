import mongoose, { Schema, Document, Model, HookNextFunction } from "mongoose";
import { PasswordEncoder } from "../services";

/**
 * Interface that describes the properties required
 * when creating a new user.
 */
interface UserProps {
  email: string;
  password: string;
  role: string;
}

/**
 * Interface that describes attributes associating
 * with the User model.
 */
interface UserModel extends Model<UserDocument> {
  build(props: UserProps): UserDocument;
}

/**
 * Interface that describes the properties in a user
 * document.
 */
interface UserDocument extends Document {
  email: string;
  password: string;
  role: string;
  createdAt: string; // created automatically
  updatedAt: string; // created automatically
}

/**
 * Schema used to model users.
 */
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
      versionKey: false,
    },
  }
);

// @ts-ignore
// @ts-ignore
/**
 * Return a user document with specified attr.
 * Invoke by calling User.build().
 *
 * @param props Properties associating with the user
 * @see UserProps
 * @see UserModel
 */
// @ts-ignore
userSchema.statics.build = (props: UserProps) => {
  return new User(props);
};

// @ts-ignore
userSchema.pre("save", async function (done: HookNextFunction) {
  // hash password
  if (this.isModified("password")) {
    const hashed = await PasswordEncoder.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export { User };
