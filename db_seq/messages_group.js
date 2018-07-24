const sequelize = require('./pgbase-connector');
const Sequelize = require('sequelize');
const messages_group = sequelize.define('messages_group', {
    sender_user_id: {
        type: Sequelize.BIGINT,
        allowNull: true
    },
    data: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },
    message_id:{
        type: Sequelize.BIGINT,
        allowNull:false
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
module.exports = messages_group;