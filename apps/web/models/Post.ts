import { Schema, model, models, Types } from 'mongoose';

const PostSchema = new Schema({
  authorId: { type: Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  labels: [{ type: String }],
  flagged: { type: Boolean, default: false },
  likes: [{ type: Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

export default models.Post || model('Post', PostSchema);
