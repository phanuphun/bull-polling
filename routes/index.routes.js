import { Router } from 'express'
import readOPC from '../services/opc.js'
import OpcValue from '../models/opcValue.js'
import miniloadQueue, { obliterate, jobs } from '../config/bull.conf.js'

const router = Router()


router.get('/', (req, res) => {
    console.log('/hello bull')
    res.status(200).send({ msg: 'ok' })
})

router.post('/opc', async (req, res, next) => {
    try {
        const node = req.body.node
        console.log(`start api path /opc , node : ${node}`);
        const resp = await readOPC(node)
        const value = String(resp);
        const save = await OpcValue.create({ node: `LINE0${node}-MP`, value: `D0328:${value}` });

        res.json({ ok: resp, data: save });
    } catch (err) {
        res.json({ ok: 'not ok', err: err.message });
    }
})

router.get('/data', async (req, res, next) => {
    try {
        const data = await OpcValue.find()
        res.json({ ok: 'ok', data });
    } catch (err) {
        res.json({ ok: 'not ok', err: err });
    }
})

router.post('/start_record', async (req, res, next) => {
    try {
        const { node, everyMs = 3000 } = req.body;
        if (!node) return res.status(400).json({ ok: false, msg: 'node is required' });

        const srm = `SRM${node}`;
        const nodeId = node;

        const job = await miniloadQueue.add(
            `LINE0${node}-MP`,
            { srm, nodeId },
            {
                jobId: `${srm}-recorder`,
                repeat: { every: everyMs },
                removeOnComplete: { age: 3600 },
                removeOnFail: 1000,
                removeOnComplete: true,
            },
        )

        jobs.push({
            name: srm,
            job: job
        })
        console.log(`add queue ${srm}`)
        return res.json({ ok: true, msg: `started ${srm}` });
    } catch (err) {
        res.json({ ok: `Cannt start record node : ${node}`, err: err });
    }
})

router.get('/stop_record', async (req, res, next) => {
    try {
        const { node } = req.query;
        const jobName = `SRM${node}`

        const repeats = await miniloadQueue.getRepeatableJobs();
        for (const job of repeats) {
            if (job.name == jobName) {
                await miniloadQueue.removeRepeatable(
                    job.name,                // ชื่อ job เมื่อ add() ครั้งแรก
                    { every: job.ms, jobId: job.id }
                );
            }
            console.log(`🗑️ ลบตารางซ้ำ ${job.name}`);
        }

        return res.json({ ok: 'ok', msg: `deleted ${node}`, data: repeats });
    } catch (err) {
        console.log('err:', err)
        return res.json({ ok: `cannot stop record`, err: err });
    }
})



export default router