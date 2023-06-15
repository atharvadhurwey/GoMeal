import nc from 'next-connect';
import client from '../../../utils/client';

const handler = nc();

handler.get(async (req, res) => {
    const users = await client.fetch(`*[_type == "Users"]`, {
    });
res.send(users);
});
export default handler;
