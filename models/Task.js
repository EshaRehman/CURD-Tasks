const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Title is required
    description: { type: String },            // Optional description
    completed: { type: Boolean, default: false } // Default value is false
});

module.exports = mongoose.model('Task', TaskSchema);
