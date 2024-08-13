import mongoose, { Document, Schema } from "mongoose";

interface TaskProps extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  title: string;
  description?: string;
  status: Boolean;
  createdAt: Date;
  dueDate: Date;
}

const TaskSchema = new Schema<TaskProps>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  dueDate: {
    type: Date,
    default: Date.now(),
  },
});

const Task = mongoose.model<TaskProps>("Task", TaskSchema);
export default Task;
