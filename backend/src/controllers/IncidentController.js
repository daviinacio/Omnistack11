const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        // Define o valor de page como 1 caso não tenha sido definido
        const { page = 1, limit = 5 } = request.query;

        const incidents = await connection('incidents')
            // Agrega os valores da ong que corresponde a ong_id
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            // Limita a quantidade de itens a serem apresentados
            .limit(limit)
            // Ignora ocorrencias a partir do primeiro
            .offset((page - 1) * limit)
            .select([
                // Todos os campos de incidents
                'incidents.*',

                // Name, email, whatsapp, city e uf da ong
                'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf'
            ]);

        // Coloca o valor do primeiro item do array na constante count
        const [count] = await connection('incidents').count();

        // Retorna o tatal de itens no cabeçalho
        response.header('X-Total-Count', Object.values(count)[0]);
    
        return response.json(incidents);
    },

    async store(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        // Block non authorizated org to create incidents
        if(!ong_id)
            return response.status(401).json({ error: "Operation not authorized" });

        const org = await connection('ongs')
            .where('id', ong_id)
            .select('name')
            .first();

        if(!org)
            return response.status(400).json({ error: 'No ONG found with this ID' });
        

        // Insere um novo incident
        const [id] = await connection('incidents').insert({
            title, description, value, ong_id
        });

        console.log(`[INSERT]: A new incident was created by ong (${ong_id}) as id (${id})`);

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        // Obtem apenas o ong_id do incident
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        // Return an error if not found
        if(!incident)
            return response.status(404).json({ error: "Incident not found" });

        // Skip if is not authorized
        if(incident.ong_id !== ong_id)
            return response.status(401).json({ error: "Operation not authorized" });

        // Delete the incident
        await connection('incidents').where('id', id).delete();

        console.log(`[DELETE]: Incident (${id}) was deleted by ong (${ong_id})`);

        // Response an empty successfully code
        return response.status(204).send();
    }
};