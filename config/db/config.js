const mongoose = require('mongoose');

const DB_CONN_STRING =
    process.env.MONGO_CONN_STR || 'mongodb://localhost:27017/express_bullmq?authSource=admin';

mongoose
    .connect(DB_CONN_STRING)                        // ตั้งแต่ v6+ ไม่ต้องใส่ option เพิ่ม
    .then(() => console.log('✅ Mongo connected'))
    .catch(err => {
        console.error('❌ Mongo connection error', err);
        process.exit(1);
    });

module.exports = mongoose;    