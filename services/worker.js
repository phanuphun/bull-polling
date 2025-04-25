// worker.js
import { Worker } from 'bullmq';
import readOPC from './opc.js';
import OpcValue from '../models/opcValue.js';
import '../config/db/config.js';
import 'dotenv/config';

const QUEUE_NAME = 'miniload-record-data';
const PREFIX = 'miniload';

const connection = {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT) || 6379,
};
console.log(connection)

const worker = new Worker(
    QUEUE_NAME,
    async (job) => {
        const { srm, nodeId } = job.data;
        console.log()
        const value = await readOPC(nodeId)
        await OpcValue.create({ node: `LINE0${nodeId}-MP`, value: `D0328:${value}` });
        console.log(`RAW DATA : ${nodeId}(${srm}) , READING VALUE: ${value}`)
        return value;
    },
    {
        connection,
        prefix: PREFIX,
        concurrency: 50
    },
);

export default worker