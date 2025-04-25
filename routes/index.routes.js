const { Router } = require('express');
const router = Router()
const connectOpc = require('../services/opc')
const OpcValue = require('../models/opcValue');

router.get('/', (req, res) => {
    console.log('/hello bull')
    res.status(200).send({ msg: 'ok' })
})

router.post('/opc', async (req, res, next) => {
    try {
        console.log('start api path /opc');
        const resp = await connectOpc()
        const value = String(resp);
        await OpcValue.create({ value });
        res.json({ ok: resp });
    } catch (err) {
        res.json({ ok: 'not ok', err: err });
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

module.exports = router