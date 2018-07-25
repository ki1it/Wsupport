const sequelize = require('./pgbase-connector');
const Sequelize = require('sequelize');
const Sup_Worker = sequelize.define('Sup_Worker', {
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
  
module.exports= Sup_Worker