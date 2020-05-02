const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const ong_id = request.headers.authorization;

        const ong = await connection('ongs')
            .where('id', ong_id || '')
            .select('*')
            .first();

        if(!ong || !ong_id)
            return response.status(401).json({ error: "Operation not authorized" });

        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select([
                'id', 'title', 'description', 'value'
            ]);

        ong.incidents = incidents;

        return response.json(ong);
    }
};