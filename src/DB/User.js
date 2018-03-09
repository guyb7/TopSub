import Sequelize from 'sequelize'

export default {
  name: 'User',
  key: 'user',
  definition: {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      }
    },
    passwordHash: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  indexes: [
    {
      unique: true,
      fields: ['email']
    }
  ]
}
