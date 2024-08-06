import mongoose, { Document, Schema } from "mongoose";

interface TaskProps extends Document {
  title: string;
  description: string;
  status: Boolean;
  createdAt: Date;
  dueDate: Date;
}

const TaskSchema = new Schema<TaskProps>({
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

module.exports = mongoose.model<TaskProps>("Task", TaskSchema);
