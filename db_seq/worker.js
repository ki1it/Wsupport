const sequelize = require('./pgbase-connector');
const Sequelize = require('sequelize');
const Worker = sequelize.define('Worker', {
  name: {
      type: Sequelize.STRING,
    },
    chat_id: {
      type: Sequelize.BIGINT,
      allowNull: true
    },
    tel_number: {
      type: Sequelize.STRING,
        unique:true
    }
  });
  
module.exports = Worker