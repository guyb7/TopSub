import Sequelize from 'sequelize'

export default sequelize => {
  const Subscription = sequelize.define('Subscription', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    topic: {
      type: Sequelize.STRING,
      allowNull: false
    },
    limit: {
      type: Sequelize.INTEGER,
      defaultValue: 10,
      allowNull: false
    },
    period: {
      type: Sequelize.ENUM('hour', 'day', '3days', 'week', 'month'),
      defaultValue: 'day',
      allowNull: false
    },
    schedule: {
      // UTC
      type: Sequelize.STRING,
      defaultValue: '* * 8 * * *',
      allowNull: false,
      validate: {
        // Sanity, not perfect match
        is: /^[\d*,\s]+$/
      }
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    }
  }, {})
  return Subscription
}
