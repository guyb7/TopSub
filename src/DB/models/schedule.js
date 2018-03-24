import Sequelize from 'sequelize'

export default sequelize => {
  const Schedule = sequelize.define('Schedule', {
    subscriptionId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    minutes: {
      type: Sequelize.ARRAY(Sequelize.TEXT)
    },
    hours: {
      type: Sequelize.ARRAY(Sequelize.TEXT)
    },
    weekDay: {
      type: Sequelize.ARRAY(Sequelize.TEXT)
    }
  }, {
    timestamps: false
  })

  Schedule.belongsTo(sequelize.models.Subscription, { as: 'subscription' })

  return Schedule
}
