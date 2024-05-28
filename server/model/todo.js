import mongoose from "mongoose";

const {Schema , model} = mongoose;

const todo = new Schema({
    task: {
        type: String,
        required: true,
        trim: true,
    },
    dueDate: {
        type: Date,
        required: true,
    }
},
{
    timestamps: true,
})

export default model('todo', todo);