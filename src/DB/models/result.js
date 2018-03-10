import Sequelize from 'sequelize'

export default sequelize => {
  const Result = sequelize.define('Result', {
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
  }, {})
  return Result
}
