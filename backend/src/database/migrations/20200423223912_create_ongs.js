// Criação
exports.up = function(knex) {
    return knex.schema.createTable('ongs', (table) => {
        table.string('id').primary();
        
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();

        // O segundo parametro define o tamanho do conteúdo
        table.string('uf', 2).notNullable();
    });
};

// Destrução
exports.down = function(knex) {
    return knex.schema.dropTable('ongs');
};
