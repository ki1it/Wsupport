const Project = require('./project')
const Message_in_Group = require('./message_in_group')
const Message= require('./message')
const Worker = require('./worker')
// const Raffle = require('Raffle')

//list_projects.hasMany(messages_group, { foreignKey:'chat_id', sourceKey:'chat_id',  onUpdate: 'cascade', onDelete: 'cascade' })
//Raffle.hasMany(Winner, { as: 'Winners', foreignKeyConstraint: true, onUpdate: 'cascade', onDelete: 'cascade' })

// Raffle.belongsTo(Lottery, { foreignKeyConstraint: true })
// Winner.belongsTo(Raffle, { foreignKeyConstraint: true })
Worker.hasMany(Message, {foreignKey: 'to_id',sourceKey: 'tel_number'});
Worker.hasMany(Message_in_Group, {foreignKey: 'to_id',sourceKey: 'tel_number'});
Project.hasMany(Message_in_Group, {foreignKey: 'chat_id',sourceKey: 'chat_id'});
Message_in_Group.belongsTo(Worker,{foreignKey: 'to_id',targetKey: 'tel_number'})
Message.belongsTo(Worker, {foreignKey: 'to_id',sourceKey: 'tel_number'})
Message_in_Group.belongsTo(Project, {foreignKey: 'chat_id',sourceKey: 'chat_id'})
async function init() {
    await Worker.sync({force:true});
    await Project.sync({force:true});
    await Message_in_Group.sync({force:true});
    await Message.sync({force:true});
}

(async function f() {

    await init();
    Worker.create({name: 'kirill', tel_number: '+79069624310'})
})()


    //module.exports.init = init()
    module.exports.Project = Project
    module.exports.Message_in_Group = Message_in_Group
    module.exports.Message = Message
    module.exports.Worker = Worker