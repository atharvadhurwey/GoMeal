import { createRouter } from 'next-connect';
import client from '../../../utils/client';

console.log("he")

const handler = createRouter();

console.log("hehe")

handler.get(async (req, res) => {
    console.log("hehehehe")
    const product = await client.fetch(`*[_type == "Product" && _id == $id][0]`, {
        id: req.query.id,
    });
    res.send(product);
});

export default handler;
