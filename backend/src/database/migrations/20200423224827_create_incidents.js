// Criação
exports.up = function(knex) {
    return knex.schema.createTable('incidents', (table) => {
        table.increments();

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable();

        // Chave estrangeira
        table.foreign('ong_id').references('id').inTable('ongs');
    });
};

// Destrução
exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
