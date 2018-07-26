const Project = require('./project')
const Message_in_Group = require('./message_in_group')
const Message= require('./message')
const Worker = require('./worker')
// const Raffle = require('Raffle')

//list_projects.hasMany(messages_group, { foreignKey:'chat_id', sourceKey:'chat_id',  onUpdate: 'cascade', onDelete: 'cascade' })
//Raffle.hasMany(Winner, { as: 'Winners', foreignKeyConstraint: true, onUpdate: 'cascade', onDelete: 'cascade' })

// Raffle.belongsTo(Lottery, { foreignKeyConstraint: true })
// Winner.belongsTo(Raffle, { foreignKeyConstraint: true })



async function init() {
    await Message_in_Group.sync();
    await Project.sync();
    await Worker.sync();
    await Message.sync();
    await Worker.hasMany(Message, {foreignKey: 'to_id',sourceKey: 'tel_number'});
    await Worker.hasMany(Message_in_Group, {foreignKey: 'to_id',sourceKey: 'tel_number'});
    await Project.hasMany(Message_in_Group, {foreignKey: 'chat_id',sourceKey: 'chat_id'});
    Message_in_Group.belongsTo(Worker, {foreignKey: 'to_id', targetKey: 'tel_number'});
    await Message_in_Group.sync();
    await Project.sync();
    await Worker.sync();
    await Message.sync();
}
init()
    module.exports.init = init
    module.exports.Project = Project
    module.exports.Message_in_Group = Message_in_Group
    module.exports.Message = Message
    module.exports.Worker = Worker