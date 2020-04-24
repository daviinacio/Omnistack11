const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(req, res){
        const ongs = await connection('ongs').select('*');
    
        return res.json(ongs);
    },

    async store(req, res) {
        const { name, email, whatsapp, city, uf } = req.body;

        // Gera 4 bytes de caracteres aleatórios em hexadecimal
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });

        console.log(`[INSERT]: Ong "${name}" inserida com id ${id}`);

        return res.json({
            id
        });
    }
};