import { Router } from 'express'
import readOPC from '../services/opc.js'
import OpcValue from '../models/opcValue.js'
import miniloadQueue, { obliterate } from '../config/bull.conf.js'
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

        await miniloadQueue.add(
            `LINE0${node}-MP`,
            { srm, nodeId },
            {
                jobId: `${srm}-recorder`,         // ไม่ซ้ำ – 1 job ต่อ SRM
                repeat: { every: everyMs },       // ทำซ้ำเรื่อย ๆ
                removeOnComplete: { age: 3600 }
            },
        )

        console.log(`started ${srm}`)
        return res.json({ ok: true, msg: `started ${srm}` });
    } catch (err) {
        res.json({ ok: `Cannt start record node : ${node}`, err: err });
    }
})

router.get('/stop_record', async (req, res, next) => {
    try {
        const { prefix } = req.query;
        console.log(prefix)
        const isOk = await obliterate(prefix)
        return res.json({ ok: true, msg: `deleted ${prefix}` });
    } catch (err) {
        res.json({ ok: `Cannt stop record`, err: err });
    }
})



export default router