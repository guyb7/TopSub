import Sequelize from 'sequelize'

import Result from './models/result'
import Schedule from './models/schedule'
import Subscription from './models/subscription'
import User from './models/user'

// Order is important for associations
const modelsDefinitions = [
  Result,
  Schedule,
  Subscription,
  User
]

const models = {}

const {
  RAZZLE_PG_HOST,
  RAZZLE_PG_PORT,
  RAZZLE_PG_DB,
  RAZZLE_PG_USER,
  RAZZLE_PG_PASSWORD,
  RAZZLE_DB_LOGGING
} = process.env

const sequelize = new Sequelize(RAZZLE_PG_DB, RAZZLE_PG_USER, RAZZLE_PG_PASSWORD, {
  host: RAZZLE_PG_HOST,
  port: RAZZLE_PG_PORT,
  dialect: 'postgres',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: (message, benchmark) => {
    if (RAZZLE_DB_LOGGING !== 'false') {
      console.log(benchmark, message)
    }
  },
  benchmark: true
})

const init = async () => {
  try {
    await sequelize.authenticate()
  } catch (e) {
    console.error(`Unable to connect to the database on ${RAZZLE_PG_USER}@${RAZZLE_PG_HOST}:${RAZZLE_PG_PORT}: `, e)
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
  models,
  sequelize
}
