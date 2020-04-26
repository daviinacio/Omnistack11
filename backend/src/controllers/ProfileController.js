const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const ong_id = request.headers.authorization;

        const ong = await connection('ongs')
            .where('id', ong_id)
            .select('*')
            .first();

        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');

        ong.incidents = incidents;

        return response.json(ong);
    }
};