const Project = require('./project')
const Message_in_Group = require('./message_in_group')
const Message= require('./message')
const Workerr = require('./worker')
// const Raffle = require('Raffle')

//list_projects.hasMany(messages_group, { foreignKey:'chat_id', sourceKey:'chat_id',  onUpdate: 'cascade', onDelete: 'cascade' })
//Raffle.hasMany(Winner, { as: 'Winners', foreignKeyConstraint: true, onUpdate: 'cascade', onDelete: 'cascade' })

// Raffle.belongsTo(Lottery, { foreignKeyConstraint: true })
// Winner.belongsTo(Raffle, { foreignKeyConstraint: true })



async function init() {
    await Message_in_Group.sync({force:true});
    await Project.sync({force:true});
    await Workerr.sync({force:true});
    await Message.sync({force:true});
     Workerr.hasMany(Message, {foreignKey: 'to_id',sourceKey: 'tel_number'});
     Workerr.hasMany(Message_in_Group, {foreignKey: 'to_id',sourceKey: 'tel_number'});
     Project.hasMany(Message_in_Group, {foreignKey: 'chat_id',sourceKey: 'chat_id'});
    await Message_in_Group.sync({force:true});
    await Project.sync({force:true});
    await Workerr.sync({force:true});
    await Message.sync({force:true});
}
init()
    module.exports.init = init
    module.exports.Project = Project
    module.exports.Message_in_Group = Message_in_Group
    module.exports.Message = Message
    module.exports.Worker = Workerr