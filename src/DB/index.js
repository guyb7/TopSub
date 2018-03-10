import Sequelize from 'sequelize'

import Result from './models/result'
import Subscription from './models/subscription'
import User from './models/user'

const modelsDefinitions = [
  Result,
  Subscription,
  User
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
    const model = m(sequelize)
    models[model.getTableName()] = model
    model.sync()
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
