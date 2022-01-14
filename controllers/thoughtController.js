const Thought = require("../models/Thought");

module.exports = {
  getAllThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => {
        res.json(thoughts);
      })
      .catch((err) => res.status(500).json(err));
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .lean()
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID." })
          : res.json({
              thought,
            })
      )
      .catch((err) => res.status(500).json(err));
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this ID." })
          : res.json(thought)
      )
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  deleteThought(req, res) {
    Thought.findByIdAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID." })
          : res.json(thought)
      )
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {
        $pull: {
          reactions: {
            reactionId: req.body.reactionId,
          },
        },
      },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(400).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
