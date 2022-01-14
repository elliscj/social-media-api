const User = require("../models/User");

module.exports = {
  getAllUsers(req, res) {
    User.find()
      .then(async (users) => {
        res.json(users);
      })
      .catch((err) => res.status(500).json(err));
  },
  createUser(req, res) {
    User.create(req.body)
      .then((student) => res.json(student))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .lean()
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID." })
          : res.json({
              user,
            })
      )
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this ID." })
          : res.json(user)
      )
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  deleteUser(req, res) {
    User.findByIdAndDelete({ _id: req.params.userId })
      .then(
        (user) =>
          !user
            ? res.status(404).json({ message: "No user with that ID." })
            : res.json(user)
        // delete assosiated thoughts - Thought.deleteMany({ _id: { $in: thought.user}}) ???
      )
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => resnstatus(500).json(err));
  },
  // still need to write logic ...
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID." })
          : res.json(user)
      )
      .catch((err) => resnstatus(500).json(err));
  },
};
