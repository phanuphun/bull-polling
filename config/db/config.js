import mongoose from 'mongoose';
import 'dotenv/config'

const DB_CONN_STRING =
    process.env.MONGO_CONN_STR || 'mongodb://localhost:27017/express_bullmq?authSource=admin';

mongoose
    .connect(DB_CONN_STRING)
    .then(() => console.log('✅ Mongo connected'))
    .catch(err => {
        console.error('❌ Mongo connection error', err);
        process.exit(1);
    });

export default mongoose