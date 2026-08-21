import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId, // user id from user collection
      ref: "User", // reference to the User model
      required: true,
    },
    reciverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
    video: {
      type: String,
    },
  },
  { timestamps: true },
);


// export our schema as a model so that we can use it in other parts of our application
const Message = mongoose.model("Message", messageSchema);

export default Message;
