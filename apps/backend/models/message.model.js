import mongoose, { Schema } from "mongoose";
const messageSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    content: { type: String, required: true },
}, { timestamps: true });
export const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);
