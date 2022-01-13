const { Schema, model, Mongoose } = require("mongoose");
const thoughtSchema = require("./Thought");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trimmed: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    //valid email:{
    //}
  },
  thoughts: [thoughtSchema],
  friends: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;
