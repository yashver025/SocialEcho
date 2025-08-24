import { Schema, model, models, Types } from 'mongoose';

const CommentSchema = new Schema({
  postId: { type: Types.ObjectId, ref: 'Post', required: true },
  authorId: { type: Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  labels: [{ type: String }],
  flagged: { type: Boolean, default: false },
  likes: [{ type: Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

export default models.Comment || model('Comment', CommentSchema);
