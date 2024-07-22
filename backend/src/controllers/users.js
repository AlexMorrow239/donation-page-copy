const User = require("../models/userModel");
const Payment = require("../models/paymentModel");

const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate({ path: "paymentIds" });
    res.status(200).json({
      message: "Get all users",
      data: users,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, data: {} });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.userEmail,
      address: req.body.address,
      country: req.body.country,
      state: req.body.state,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
      totalPaid: 0,
      paymentIds: [],
    });

    const existingUser = await User.findOne({ email: req.body.userEmail });
    if (existingUser) {
      //If the user already exists, update the user's info with whatever was entered
      return await updateUser(req, res);
      
      //return res
      //  .status(409)
      //  .json({ message: "User already exists.", data: existingUser });
    }

    // Save the new user
    const savedUser = await newUser.save();
    res.status(201).json({ message: "User created.", data: savedUser });
  } catch (err) {
    res.status(500).json({ message: err.message, data: {} });
  }
};

const getUser = async (req, res) => {
  try {
    console.log(req.params.id);
    const user = await User.findById(req.params.id).populate({
      path: "paymentIds",
    });
    if (user) {
      res.status(200).json({ message: "Return user by ID!", data: user });
    } else {
      res.status(404).json({ message: "User not found!", data: {} });
    }
  } catch (err) {
    res.status(500).json({ message: err.message, data: {} });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate({
      path: "paymentIds",
    });
    if (user) {
      const paymentIds = req?.body?.payments.map((x) => x.id);
      user.firstName = req?.body?.firstName || user.firstName;
      user.paymentIds = paymentIds ? paymentIds : user.paymentIds;
      user.lastName = req?.body?.lastName || user.lastName;
      user.email = req?.body?.email || user.email;
      user.address = req?.body?.address || user.address;
      user.country = req?.body?.country || user.country;
      user.state = req?.body?.state || user.state;
      user.phoneNumber = req?.body?.phoneNumber || user.phoneNumber;
      user.zipCode= req?.body?.zipCode || user.zipCode;
      user.totalPaid = req?.body?.totalPaid || user.totalPaid;
      const updatedUser = await user.save();
      const userRes = await updatedUser.populate({
        path: "paymentIds",
      });
      res.status(200).json({ message: "User updated!", data: userRes });
    } else {
      res.status(404).json({ message: "User not found!", data: [] });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, data: {} });
  }
};

const deleteUser = async (req, res) => {
  try {
    // Find the user by ID
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Delete all payments associated with the user
    const payments = await Payment.find({ userId: user._id });

    if (payments.length > 0) {
      // Delete all payments associated with the user
      await Payment.deleteMany({ userId: user._id });
    }

    // Delete the user
    await User.deleteOne({ _id: user._id });

    return res.status(200).json({
      message: "User and associated payments deleted!",
      id: req.params.id,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
