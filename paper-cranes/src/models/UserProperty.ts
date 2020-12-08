/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-05
 */

import mongoose, { Schema, Document, Model } from "mongoose";
import { defaultUserProperties } from "@ly-letitfly/common";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface UserPropertyProps {
  id: string;
  paperCraneStyles?: string[];
}

export interface UserPropertyDocument extends Document {
  paperCraneStyles: string[];
}

interface UserPropertyModel extends Model<UserPropertyDocument> {
  build(props: UserPropertyProps): UserPropertyDocument;
}

const defaultUserPaperCraneStyles = defaultUserProperties.paperCraneStyleItems.map(
  (item) => item.value
);

const UserPropertySchema = new Schema(
  {
    paperCraneStyles: {
      type: [String],
      required: true,
      default: defaultUserPaperCraneStyles,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);
UserPropertySchema.plugin(updateIfCurrentPlugin);

const build = (props: UserPropertyProps) => {
  const property: any = { _id: props.id, ...props };
  delete property.id;
  return new UserProperty(property);
};
UserPropertySchema.static("build", build);

const UserProperty = mongoose.model<UserPropertyDocument, UserPropertyModel>(
  "UserProperty",
  UserPropertySchema
);

export { UserProperty };
