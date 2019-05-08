// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/lambda.db3'
    },
    migrations: {
        directory: './data/migrations' //points to where migrations will be 
    },
    seeds: {
      directory: './data/seeds',
    }
  }
}
