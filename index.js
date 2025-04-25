import express from 'express';
import router from './routes/index.routes.js'
import 'dotenv/config'
import './config/db/config.js';

const app = express();
const PORT = process.env.PORT || 3333

app.use(express.json());
app.use(router)

app.listen(PORT, () => {
    console.log(`server start on port ${PORT}`);
});