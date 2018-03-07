import Sequelize from 'sequelize'

import Result from './Result'

const modelsDefinitions = [
  Result
]

const models = {}

const {
  PG_HOST,
  PG_PORT,
  PG_DB,
  PG_USER,
  PG_PASSWORD
} = process.env

const sequelize = new Sequelize(PG_DB, PG_USER, PG_PASSWORD, {
  host: PG_HOST,
  port: PG_PORT,
  dialect: 'postgres',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const init = async () => {
  try {
    await sequelize.authenticate()
  } catch (e) {
    console.error(`Unable to connect to the database on ${PG_USER}@${PG_HOST}:${PG_PORT}: `, e)
    throw e
  }
  for (let m of modelsDefinitions) {
    models[m.name] = sequelize.define(m.key, m.definition)
    await models[m.name].sync()
  }
}

const close = async () => {
  await sequelize.close()
  return
}

export default {
  init,
  close,
  models
}
