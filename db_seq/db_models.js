const sequelize = require('./pgbase-connector');
const Sequelize = require('sequelize');
const list_projects = sequelize.define('list_projects', {
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    chat_id: {
        type: Sequelize.BIGINT
    }
});
const messages_group = sequelize.define('messages_group', {
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
        type: Sequelize.BIGINT
    },
    from_tp: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    react_time: {
        type: Sequelize.BIGINT,
        allowNull: true
    }
});
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
module.exports.messages_group = messages_group;
module.exports.list_projects = list_projects;