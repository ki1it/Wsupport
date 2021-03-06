const sequelize = require('./pgbase-connector');
const Sequelize = require('sequelize');
const Project = sequelize.define('Projects', {
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    chat_id: {
        type: Sequelize.BIGINT,
        unique:true
    },
    invite_link: {
        type: Sequelize.STRING,
        allowNull: true
    },
    hidden:{
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true

    }
});
module.exports = Project;