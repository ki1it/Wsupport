const sequelize = require('./pgbase-connector');
const Sequelize = require('sequelize');
const list_sup_workers = sequelize.define('list_sup_workers', {
  name: {
      type: Sequelize.STRING,
      allowNull: true
    },
    chat_id: {
      type: Sequelize.BIGINT,
      allowNull: true
    },
    tel_number: {
      type: Sequelize.STRING,
      allowNull: true
    }
  });
  
module.exports = list_sup_workers