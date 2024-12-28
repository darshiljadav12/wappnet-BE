import { Schema, model, Document } from "mongoose";

interface IContact extends Document {
  name: string;
  number: string;
  avatar: string;
  tags: string[]; 
}

const contactSchema = new Schema<IContact>({
  name: { type: String, required: true },
  number: { type: String, required: true },
  avatar: { type: String, required: true }, 
  tags: { type: [String], default: [] }, 
});

export const Contact = model<IContact>("Contact", contactSchema);

