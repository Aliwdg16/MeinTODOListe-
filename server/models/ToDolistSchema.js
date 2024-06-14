import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      completed: {
        type: Boolean,
        default: false,
        required: true,
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    
    date: {
        type: Date,
    default: Date.now,
    required: true,
      },
    },
      
      
      {
        timestamps: true,
});

export default mongoose.model("ToDo", todoSchema);
