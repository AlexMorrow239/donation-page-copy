const mongoose = require('mongoose');

const exportTimestampSchema = new mongoose.Schema({
    lastExport: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('ExportTimestamp', exportTimestampSchema);