const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      requried: [true, "Please add contact name"],
    },
    email: {
      type: String,
      requried: [true, "Please add contact email address"],
    },
    phone: {
      type: String,
      requried: [true, "Please add contact number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
