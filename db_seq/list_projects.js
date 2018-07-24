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
module.exports.list_projects = list_projects;