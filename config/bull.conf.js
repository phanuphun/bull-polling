import { Queue, Worker } from 'bullmq';
import 'dotenv/config'

const HOST = process.env.REDIS_HOST
const PORT = process.env.REDIS_PORT

const QUEUE_NAME = 'miniload-record-data'
const PREFIX = 'miniload'
const connection = { host: HOST, port: PORT }
const miniloadQueue = new Queue(
    QUEUE_NAME,
    {
        connection: connection,
        prefix: PREFIX
    }
);

export async function obliterate(prefix) {
    try {
        const q = new Queue(QUEUE_NAME, { connection, prefix });
        await q.pause(false);                 // กัน worker ดึงงาน
        await q.obliterate({ force: true });  // ลบทุกสถานะ + repeat
        await q.close();
        console.log(`obliterated ${prefix}:${QUEUE_NAME}`);
        return true
    } catch (err) {
        console.log(`err obliterated : ${err}`)
        return false
    }
}

export default miniloadQueue

