const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Goal = sequelize.define('Goal', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    targetAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    currentAmount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    deadline: { type: DataTypes.DATE, allowNull: false },
});

Goal.belongsTo(User, { foreignKey: 'userId' });
module.exports = Goal;
