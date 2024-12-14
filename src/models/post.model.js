import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: `User`
        },
        content: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: `User`
            },
        ],
        Comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: `Comment`
            },
        ],
    },
    {
        timestamps: true,
    },
);
  
  module.exports = mongoose.model('Post', postSchema);
  