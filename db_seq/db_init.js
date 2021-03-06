const Project = require('./project')
const Message_in_Group = require('./message_in_group')
const Message= require('./message')
const Worker = require('./worker')
const Monkey = require('./monkey')
// const Raffle = require('Raffle')

//list_projects.hasMany(messages_group, { foreignKey:'chat_id', sourceKey:'chat_id',  onUpdate: 'cascade', onDelete: 'cascade' })
//Raffle.hasMany(Winner, { as: 'Winners', foreignKeyConstraint: true, onUpdate: 'cascade', onDelete: 'cascade' })

// Raffle.belongsTo(Lottery, { foreignKeyConstraint: true })
// Winner.belongsTo(Raffle, { foreignKeyConstraint: true })
Worker.hasMany(Message, {foreignKey: 'to_id',sourceKey: 'tel_number'});
Worker.hasMany(Message_in_Group, {foreignKey: 'to_id',sourceKey: 'tel_number'});
Project.hasMany(Message_in_Group, {foreignKey: 'chat_id',sourceKey: 'chat_id'});
Message_in_Group.belongsTo(Worker,{foreignKey: 'to_id',targetKey: 'tel_number'})
Message.belongsTo(Worker, {foreignKey: 'to_id',targetKey: 'tel_number'})
Message_in_Group.belongsTo(Project, {foreignKey: 'chat_id',targetKey: 'chat_id'})
async function init() {
    // await Worker.sync({force:true});
    // await Project.sync({force:true});
    // await Message_in_Group.sync({force:true});
    // await Message.sync({force:true});
    await Worker.sync();
    await Project.sync();
    await Message_in_Group.sync();
    await Message.sync();
    await Monkey.sync()
}

(async function f() {

    await init();
    // Worker.create({name: 'Alex_andmin', tel_number: '+79021419479'})
    // Worker.create({name: 'Julia_admin', tel_number: '+79021423788'})
    // Worker.create({name: 'Mark_admin', tel_number: '+79967090026'})
    // Worker.create({name: 'Andrew_admin', tel_number: '+79021419412'})
    // Worker.create({name:'kirill',tel_number: '+79069624310'})
})()


    //module.exports.init = init()
    module.exports.Project = Project
    module.exports.Message_in_Group = Message_in_Group
    module.exports.Message = Message
    module.exports.Worker = Worker
    module.exports.Monkey = Monkey