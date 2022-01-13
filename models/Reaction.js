const { Schema, model, Mongoose } = require("mongoose");
// const reactionSchema = require("./Reaction");

const reactionSchema = new Schema({
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: Schema.Types.username,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // getter to format on query
  },
});
