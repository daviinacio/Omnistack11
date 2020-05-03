const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(request, response){
        const ongs = await connection('ongs').select('*');
        
        const [count] = await connection('ongs').count();

        response.header('X-Total-Count', Object.values(count)[0]);
    
        return response.json(ongs);
    },

    async store(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        const count = await connection('ongs')
            .where('name', '=', name || '')
            .orWhere('email', '=', email || '')
            .orWhere('whatsapp', '=', whatsapp || '')
            .count();
        
        if(Object.values(count[0])[0] > 0)
            return response.status(400).json({ error: 'There is an ONG with this name or this e-mail or this whatsapp number' });


        // Gera 4 bytes de caracteres aleatórios em hexadecimal
        const id = crypto.randomBytes(4).toString('HEX');

        try {
            await connection('ongs').insert({
                id, name, email, whatsapp, city, uf
            });
        }
        catch (e) {
            return response.status(400).json({
                error: 'Anything wrong with your request',
                exception: e.code
            });
        }

        console.log(`[INSERT]: A new Ong was created with name "${name}" on id (${id})`);

        return response.json({
            id
        });
    },

    async delete(request, response) {
        const ong_id = request.headers.authorization;

        const ong = await connection('ongs')
            .where('id', '=', ong_id || '')
            .first();

        if(!ong || !ong_id)
            return response.status(401).json({ error: "Operation not authorized" });

        // Delete the ONG by ID
        await connection('ongs')
            .delete()
            .where('id', '=', ong_id);

        // Delete the Incidents from ONG
        await connection('incidents')
            .delete()
            .where('ong_id', '=', ong_id);

        return response.status(204).send();
    }
};