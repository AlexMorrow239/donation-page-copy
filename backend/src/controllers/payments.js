const Payment = require("../models/paymentModel");
const User = require("../models/userModel");
const Goal = require("../models/goalModel");

const createPayment = async (req, res) => {
  try {
    console.log("Creating a payment");
    const { userEmail, amount, method, message, anonymous = false } = req.body;

    console.log(`User is ${userEmail} paying $${amount} by ${method}`);

    // Validate the user ID
    const user = await User.findOne({ email: userEmail });
    if (user) {
      console.log("user exists");

      const payment = new Payment({
        userId: user._id,
        amount,
        method,
        message,
        anonymous,
      });
      const paymentRes = await payment.save();

      console.log(`The payments exist, the id is ${paymentRes._id}`);

      //update the user to include this payment in their payment ids
      user.paymentIds.push(paymentRes._id);
      user.totalPaid = String(Number(user.totalPaid) + Number(amount));
      const useRes = await user.save();

      console.log(
        `We have pushed the paymentId, the user has donated a total of ${user.totalPaid}`
      );

      //update the current goal after someone has paid
      const goal = await Goal.findOne({ isCurrentGoal: true });
      console.log(`${goal.currentTotal}, ${goal.goalAmount}`);
      // // //
      goal.currentTotal += Number(amount);
      console.log(`${goal.currentTotal}`);
      goalRes = await goal.save();

      console.log(
        `The current total has now been updated to ${goal.currentTotal}`
      );

      res.status(201).json({
        message: "Payment created.",
        paymentData: paymentRes,
        userData: useRes,
      });

      console.log("done");
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error, something happened" });
  }
};

const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate({ path: "userId" });

    const filteredPayments = payments.filter((payment) => {
      // Check if `createdAt` is defined and a valid date
      if (payment.createdAt) {
        const date = new Date(payment.createdAt);
        return !isNaN(date.getTime());
      }
      return false;
    });

    const recentPayments = filteredPayments.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt) //is this actually getting recent ones
    );
    const paymentsWithMessages = [];

    // Iterate through payments array
    for (let i = 0; i < recentPayments.length; i++) {
      const payment = recentPayments[i];

      // Check if the payment has a message
      if (payment.message && payment.message.trim() !== "") {
        paymentsWithMessages.push(payment);

        //Found 5 payments
        if (paymentsWithMessages.length === 5) {
          break;
        }
      }
    }

    //We are returning the 5 most recent payments with messages attached to them
    res.status(200).json({
      message: "Get all payments",
      data: paymentsWithMessages,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, data: {} });
  }
};

const getPayment = async (req, res) => {
  try {
    console.log(req.params.id);
    const payment = await Payment.findById(req.params.id);
    if (payment) {
      res.status(200).json({ message: "Return payment by ID!", data: payment });
    } else {
      res.status(404).json({ message: "Payment not found!", data: {} });
    }
  } catch (err) {
    res.status(500).json({ message: error.message, data: {} });
  }
};

// Update the payment message and anonymous status
const updatePayment = async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  console.log(user);
  if (!user) {
    return res.status(404).json({ message: "No payments from this user" });
  }

  const payment = await Payment.findOne({ userId: user._id }).sort({
    createdAt: -1,
  });

  if (payment) {
    payment.message = req.body?.message || payment.message;
    payment.anonymous = req.body?.anonymous || payment.anonymous;

    const updatedPayment = await payment.save();
    updatedPayment.populate({ path: "userId" });
    res.status(200).json({
      message: "Payment updated!",
      data: updatedPayment,
    });
  } else {
    res.status(404).json({ message: "Payment not found!" });
  }
};

const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (payment) {
      return res
        .status(200)
        .json({ message: "Payment deleted!", id: req.params.id });
    } else {
      return res.status(404).json({ message: "Payment not found!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPayments,
  getPayment,
  createPayment,
  updatePayment,
  deletePayment,
};

// {
//   "userEmail": "fakeEmail@lol.com",
//   "userId": "6675a3e207f3ff711e4ededd",
//   "amount": 20,
//   "method": "Bitcoin",
//   "message": "I really feel like am making a difference!",
//   "anonymous": false
// }
