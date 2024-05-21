import mongoose from "mongoose";
import { type } from "os";
const addSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true
        }
    },{timestamps: true}
);

const Add = mongoose.model('Add', addSchema);
export default Add;