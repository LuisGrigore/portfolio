import mongoose, { Schema, Model, Document } from "mongoose";

export interface IMessage extends Document {
  name: string;
  email: string;
  content: string;
  createdAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
	name: { type: String, required: true },
	email: { type: String, required: true },
	content: { type: String, required: true },
  },
  { timestamps: true }
);


export const Message: Model<IMessage> =
  mongoose.models.Message || mongoose.model<IMessage>("Message", messageSchema);
