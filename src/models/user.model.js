import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
        },
        coverPhoto: {
            type: String,
        },
        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: `User`
            },
        ],
    },
    {
        timestamps: true,
    },
);

export default mongoose.model("User", userSchema);