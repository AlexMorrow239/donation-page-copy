const mongoose = require('mongoose');

const donationGoalSchema = new mongoose.Schema({
    goalAmount: {
        type: Number,
        default: 2500
    },
    currentTotal: {
        type: Number,
        default: 0
    },
    isCurrentGoal: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('DonationGoal', donationGoalSchema);
