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
    topic: {
      type: Sequelize.STRING,
      allowNull: false
    },
    score: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    externalId: {
      type: Sequelize.STRING
    },
    publishTime: {
      type: Sequelize.DATE
    },
    url: {
      type: Sequelize.STRING,
      validate: {
        isUrl: true
      }
    },
    data: {
      type: Sequelize.JSONB
    }
  }
}
