// make a working server
//create required endpoints for MVP

const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

// -- create DataBase with knex
//  -- connect knexFile
// -- figure out gitFolder

const knexConfig = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: './data/lambda.db3'
    }
}

const db = knex(knexConfig);
const server = express();

server.use(helmet());
server.use(express.json());

// [POST] /api/cohorts  This route should save a new cohort to the database.
server.post('/api/cohorts', (req, res) => {
    db('cohorts')
        .insert(req.body)
        .then(cohort => {
            res.status(200).json(cohort)
        })
        .catch( error => {
            res.status(500).json(error)
        });
});

// [GET] /api/cohorts This route will return an array of all cohorts.
server.get('/api/cohorts', (req, res) => {
    db('cohorts') //targeting the cohorts table
    .then(cohorts => {
        res.status(200).json(cohorts);
    })
    .catch(error => {
        res.status(500).json(error);
    })
});
// [GET] /api/cohorts/:id  This route will return the cohort with the matching id.
server.get('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;
    db('cohorts')
        .where({ id })
        .first() //?
        .then(cohort => {
            res.status(200).json(cohort)
        })
        .catch(error => {
            res.status(500).json(error)
        });
});

// [GET] /api/cohorts/:id/students returns all students for the cohort with the specified id. --- .join()

// [PUT] /api/cohorts/:id ---This route will update the cohort with the matching id using information sent in the body of the request.
server.put('/api/cohorts/:id', (req, res) => {
    db('cohorts')
        .where({ id: req.params.id })
        .update(req.body)
        .then(count => {
            if (count > 0) {
                res.status(200).json(count)
            } else {
                res.status(404).json({ message: 'Cohort not found' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});
// [DELETE] /api/cohorts/:id This route should delete the specified cohort.

server.delete('/api/cohorts/:id', (req, res) => {
    db('cohorts')
        .where({ id: req.params.id })
        .del()
        .then(count => {
            if (count > 0) {
                res.status(200).end();
            } else {
                res.status(404).json({ message: 'Cohort not found' });
            }
        })
        .catch( error => {
            res.status(500).json(error);
        })
})


server.listen(9000, () => { 
    console.log('Server is listening on port: 9000')
});
