// models/opcReading.js
const mongoose = require('../config/db/config');

const opcValueSchema = new mongoose.Schema(
    {
        value: { type: String, required: true },  // ← เก็บเป็นสตริงเท่านั้น
        createdAt: { type: Date, default: Date.now }
    },
    { versionKey: false }
);

module.exports = mongoose.model('OpcValue', opcValueSchema);