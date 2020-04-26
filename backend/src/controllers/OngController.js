const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(request, response){
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async store(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

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

        console.log(`[INSERT]: A new Ong was created with name "${name}" on id (${id})`);

        return response.json({
            id
        });
    },

    async delete(request, response) {
        
    }
};