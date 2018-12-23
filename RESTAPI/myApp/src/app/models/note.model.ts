import { Document, Schema, Model, model } from "mongoose";
import { INote } from "../interface/iNote";


export interface INoteModel extends INote, Document {
}

export var NoteSchema: Schema = new Schema({
    title: String,
    content: String
}, {
        timestamps: true
    });

export const Note: Model<INoteModel> = model<INoteModel>("Note", NoteSchema);