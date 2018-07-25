const Project = require('./project')
const Message_in_Group = require('./message_in_group')
const Message= require('./message')
const Sup_Worker = require('./sup_worker')
// const Raffle = require('Raffle')

//list_projects.hasMany(messages_group, { foreignKey:'chat_id', sourceKey:'chat_id',  onUpdate: 'cascade', onDelete: 'cascade' })
//Raffle.hasMany(Winner, { as: 'Winners', foreignKeyConstraint: true, onUpdate: 'cascade', onDelete: 'cascade' })

// Raffle.belongsTo(Lottery, { foreignKeyConstraint: true })
// Winner.belongsTo(Raffle, { foreignKeyConstraint: true })

Sup_Worker.hasMany(Message, {foreignKey: 'tel_number',sourceKey: 'to_id'});


async function init() {
  await Message_in_Group.sync();
  await Project.sync();
  await Sup_Worker.sync();
  await Message.sync();
}

    module.exports.init = init
    module.exports.list_projects = list_projects
    module.exports.messages_group = messages_group
    module.exports.messages = messages
    module.exports.list_sup_workers = list_sup_workers