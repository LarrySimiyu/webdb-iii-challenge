
exports.up = function (knex, Promise) {

    return knex.schema.createTable('students', tbl => {

        tbl.increments();

        tbl
            .string('name', 128)
            .notNullable()
            .unique();

        tbl
            .integer('cohort_id') //cohort id foreign key 
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

// the one that broke the code 

        // tbl.increments();


        // tbl.string('name', 125)

        //     .notNullable()
        //     .unique();
        // tbl
        //     .timestamps(true, true)



        // tbl
        //     .integer('cohort_id')
        //     .references('id')
        //     .notNullable()
        //     .inTable('cohorts') //how we are ref cohorts table as a student
