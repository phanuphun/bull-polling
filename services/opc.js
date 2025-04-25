import { OPCUAClient } from "node-opcua";
import 'dotenv/config'

const OPC_URL = process.env.OPC_URL;

async function readOPC(node) {
    const NODE_ID = `ns=2;s=LINE0${node}-MP.ASRS.D0328`
    const client = OPCUAClient.create({ endpointMustExist: false });
    try {
        await client.connect(OPC_URL);
        const session = await client.createSession();
        const dataValue = await session.read({
            nodeId: NODE_ID,
        });
        const value = dataValue.value.value;
        await session.close();
        await client.disconnect();
        return value;
    } catch (err) {
        console.error("OPC UA error:", err.message);
        throw new err
    }
}

export default readOPC