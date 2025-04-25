import mongoose from 'mongoose';

const opcValueSchema = new mongoose.Schema(
    {
        value: { type: String, required: true },
        node: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    },
    { versionKey: false }
);

const OpcValue = mongoose.model('OpcValue', opcValueSchema);

export default OpcValue