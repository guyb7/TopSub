require('../../env.js')

const {
  PG_HOST,
  PG_PORT,
  PG_DB,
  PG_USER,
  PG_PASSWORD
} = process.env

module.exports = {
  development: {
    username: PG_USER,
    password: PG_PASSWORD,
    database: PG_DB,
    host: PG_HOST,
    port: PG_PORT,
    dialect: 'postgres'
  }
}
