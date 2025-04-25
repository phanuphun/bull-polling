const { OPCUAClient, AttributeIds } = require("node-opcua");
require('dotenv').config()

const OPC_URL = process.env.OPC_URL;
const NODE_ID = process.env.NODE_ID;
async function connectOpc() {
    console.log(OPC_URL, NODE_ID);
    console.log('opc start function')
    const client = OPCUAClient.create({ endpointMustExist: false });
    try {
        await client.connect(OPC_URL);
        const session = await client.createSession();

        const dataValue = await session.read({
            nodeId: NODE_ID,
        });
        const value = dataValue.value.value;
        console.log(`✅ ${NODE_ID} =`, value);

        await session.close();
        await client.disconnect();
        return value;
    } catch (err) {
        console.error("OPC UA error:", err.message);
        throw new err
    }
}
module.exports = connectOpc;