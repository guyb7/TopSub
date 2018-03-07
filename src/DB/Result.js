import Sequelize from 'sequelize'

export default {
  name: 'Result',
  key: 'result',
  definition: {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    externalId: {
      type: Sequelize.STRING
    }
  }
}
