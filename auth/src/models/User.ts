import mongoose, { Schema, Document, Model } from "mongoose";
import { PasswordEncoder } from "../services";

/**
 * Interface that describes the properties required
 * when creating a new user.
 */
interface UserProps {
  email: string;
  password: string;
  role: string;
  firstName?: string;
  lastName?: string;
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
  firstName: string;
  lastName: string;
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
    firstName: String,
    lastName: String,
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

/**
 * Return a user document with specified attr.
 * Invoke by calling User.build().
 *
 * @param props Properties associating with the user
 * @see UserProps
 * @see UserModel
 */
const build = (props: UserProps) => {
  return new User(props);
};
userSchema.static("build", build);

userSchema.pre<UserDocument>("save", async function (done) {
  // hash password
  if (this.isModified("password")) {
    const hashed = await PasswordEncoder.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done(null);
});

const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export { User };
