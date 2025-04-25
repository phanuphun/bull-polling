// index.js
const express = require('express');
const router = require('./routes/index.routes')
const app = express();
require('dotenv').config()

const PORT = process.env.PORT || 3333

// body-parser สำหรับ JSON post
app.use(express.json());
app.use(router)

app.listen(PORT, () => {
    console.log(`server start on port ${PORT}`);
});