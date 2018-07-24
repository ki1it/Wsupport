const sequelize = require('./pgbase-connector');
const Sequelize = require('sequelize');
const messages = sequelize.define('messages', {
    sender_user_id: {
      type: Sequelize.BIGINT,
      allowNull: true
    },
    data: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    text: {
      type: Sequelize.STRING,
      allowNull: true
    },
    to_id: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    chat_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    from_tp: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    react_time: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  });
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
  
module.exports.list_sup_workers = list_sup_workers
module.exports.messages = messages;

