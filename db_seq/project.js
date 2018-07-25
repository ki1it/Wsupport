const sequelize = require('./pgbase-connector');
const Sequelize = require('sequelize');
const Project = sequelize.define('Projects', {
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    chat_id: {
        type: Sequelize.BIGINT
    }
});
module.exports = Project;