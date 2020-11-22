import { Schema, Document, model, SchemaDefinition } from "mongoose";
import { stringify } from "querystring";

interface INote extends Document {
  title: string;
  description: string;
  category: string;
}

class NoteSchema {
  _schemaDefinition: SchemaDefinition;
  _noteSchema: Schema;
  constructor() {
    this._schemaDefinition = {
      title: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
      description: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
      category: {
        type: String,
        default: "Important",
        trim: true,
        lowercase: true,
      },
      user_id: {
        type: String,
        required: true,
        trim: true
      }
    };
    this._noteSchema = new Schema(this._schemaDefinition, { timestamps: true });
  }
}

const noteSchema = new NoteSchema();

export default model<INote>("Note", noteSchema._noteSchema);
