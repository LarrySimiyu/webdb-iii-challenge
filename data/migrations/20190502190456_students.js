
exports.up = function (knex, Promise) {

    return knex.schema.createTable('students', tbl => {

        tbl.increments();

        tbl.string('name', 125)
            .notNullable()
            .unique();
        tbl
            .timestamps(true, true)

        tbl
            .integer('cohort_id')
            .references('id')

    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('students');

};

