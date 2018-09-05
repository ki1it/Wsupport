const sequelize = require('./pgbase-connector');
const Sequelize = require('sequelize');
const Project = sequelize.define('Monkey', {
    name: {
        type: Sequelize.STRING,
        unique:true
    },
    chat_id: {
        type: Sequelize.BIGINT,
        unique:true
    },

});
module.exports = Project;