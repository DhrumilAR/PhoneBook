const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const AppError = require('../middleware/appError')

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findOne({
    _id: req.params.id,
    user_id: req.user.id,
  });
  if (!contact) {
    return new AppError("Contact not found", 404);
  }
  res.status(200).json(contact);
});

const getContacts = asyncHandler(async (req, res) => {
  //before
  // const contacts = await Contact.find();

  // so this user_id is the first schema i just added,
  // ig have a ref: User, so it will show all details of
  // that particular user (ig)
  
  // (edit): here user_id is matched with the current logged in
  // user's id, and it will find only those user's whose user_id
  // is same
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

const createContact = async (req, res) => {
  
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {

    return new AppError("All fields are compulsory", 400);
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
};

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return new AppError("Contact not found", 404);
  }

  if (contact.user_id.toString() !== req.user.id) {
    return new AppError("User don't have access to update contact", 400);
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {

    return new AppError("Contact not found", 404);
  }

  if (contact.user_id.toString() !== req.user.id) {
    return new AppError("User don't have access to delete contact", 404);
  }

  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json({
    message: "Your Contact has been deleted Successfully",
  });
});

module.exports = {
  getContact,
  getContacts,
  createContact,
  updateContact,
  deleteContact,
};
