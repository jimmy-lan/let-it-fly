/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-03
 */

import mongoose, { Schema, Document, Model } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface UserProps {
  id?: string;
  avatar?: string;
  personal?: {
    name?: {
      first: string;
      last: string;
    };
    dateOfBirth?: Date;
    city?: string;
    region?: string;
    occupation?: string;
  };
  contact: {
    email: {
      primary: string;
      secondary?: string;
    };
    telephone?: string;
    socialMedia?: {
      facebook?: string;
      linkedIn?: string;
      tweeter?: string;
      youtube?: string;
    };
    other?: {
      github?: string;
      website?: string;
    };
  };
  profile?: {
    description?: string;
    interests?: string[];
  };
  dateJoined?: Date;
}

interface UserDocument extends Document {
  __v: number;
  avatar: string;
  personal: {
    name: {
      first: string;
      last: string;
    };
    dateOfBirth?: Date;
    city?: string;
    region?: string;
    occupation?: string;
  };
  contact: {
    email: {
      primary?: string;
      secondary?: string;
    };
    telephone?: string;
    socialMedia?: {
      facebook?: string;
      linkedIn?: string;
      tweeter?: string;
      youtube?: string;
    };
    other: {
      github?: string;
      website?: string;
    };
  };
  profile?: {
    description?: string;
    interests?: string[];
  };
  dateJoined: Date;
}

interface UserModel extends Model<UserDocument> {
  build(props: UserProps): UserDocument;
}

const userSchema = new Schema(
  {
    avatar: String,
    personal: {
      name: {
        first: String,
        last: String,
      },
      dateOfBirth: mongoose.Schema.Types.Date,
      city: String,
      region: String,
      occupation: String,
    },
    contact: {
      email: {
        primary: {
          type: String,
          required: true,
        },
        secondary: String,
      },
      telephone: String,
      socialMedia: {
        facebook: String,
        linkedIn: String,
        tweeter: String,
        youtube: String,
      },
      other: {
        github: String,
        website: String,
      },
    },
    profile: {
      description: String,
      interests: [String],
    },
    dateJoined: {
      type: mongoose.Schema.Types.Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
      versionKey: false,
    },
  }
);
userSchema.plugin(updateIfCurrentPlugin);

const build = (props: UserProps) => {
  const user = { _id: props.id, ...props };
  delete user.id;
  return new User(user);
};
userSchema.static("build", build);

const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export { User };
