
exports.up = function (knex, Promise) {

    return knex.schema.createTable('students', tbl => {

        tbl.increments();

        tbl
            .string('name', 128)
            .notNullable()
            .unique();

        tbl
            .integer('cohort_id')
            .notNullable()
            .references('id')
            .inTable('cohorts') // ref the cohorts table
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        tbl.timestamps(true, true);


    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('students');

};



// find out why the order is important and why it can break the code.