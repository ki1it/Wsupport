const Project = require('./project')
const Message_in_Group = require('./message_in_group')
const Message= require('./message')
const Sup_Worker = require('./sup_worker')
// const Raffle = require('Raffle')

//list_projects.hasMany(messages_group, { foreignKey:'chat_id', sourceKey:'chat_id',  onUpdate: 'cascade', onDelete: 'cascade' })
//Raffle.hasMany(Winner, { as: 'Winners', foreignKeyConstraint: true, onUpdate: 'cascade', onDelete: 'cascade' })

// Raffle.belongsTo(Lottery, { foreignKeyConstraint: true })
// Winner.belongsTo(Raffle, { foreignKeyConstraint: true })
Sup_Worker.hasMany(Message, {foreignKey: 'to_id',sourceKey: 'tel_number'});
Sup_Worker.hasMany(Message_in_Group, {foreignKey: 'to_id',sourceKey: 'tel_number'});
Project.hasMany(Message_in_Group, {foreignKey: 'chat_id',sourceKey: 'chat_id'});

async function init() {
  await Message_in_Group.sync();
  await Project.sync();
  await Sup_Worker.sync();
  await Message.sync();
}

    module.exports.init = init
    module.exports.Project = Project
    module.exports.Message_in_Group = Message_in_Group
    module.exports.Message = Message
    module.exports.Sup_Worker = Sup_Worker