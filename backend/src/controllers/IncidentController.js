const connection = require('../database/connection');

module.exports = {
    async store(req, res) {
        const { title, description, value } = req.body;
        const ong_id = req.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        console.log(`[INSERT]: Novo caso criado pela ong ${ong_id} com id ${id}`);

        return res.json({ id });
    }
};

{{{{{{{{{{{{{{{{{{{{{ "1:09:57 / 1:41:09" }}}}}}}}}}}}}}}}}}}}}