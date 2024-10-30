const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    statement: { type: String, required: true },
    // Add additional fields as necessary
});

module.exports = mongoose.model('Question', questionSchema);