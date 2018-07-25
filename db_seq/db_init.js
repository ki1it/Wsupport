const list_projects = require('./project')
const messages_group = require('./message_in_group')
const messages = require('./message')
const list_sup_workers = require('./sup_worker')
// const Raffle = require('Raffle')

//list_projects.hasMany(messages_group, { foreignKey:'chat_id', sourceKey:'chat_id',  onUpdate: 'cascade', onDelete: 'cascade' })
//Raffle.hasMany(Winner, { as: 'Winners', foreignKeyConstraint: true, onUpdate: 'cascade', onDelete: 'cascade' })

// Raffle.belongsTo(Lottery, { foreignKeyConstraint: true })
// Winner.belongsTo(Raffle, { foreignKeyConstraint: true })

Sup_Worker.hasMany(Message, {foreignKey: 'tel_number',sourceKey: 'to_id'});


async function init() {
  await messages_group.sync();
  await list_projects.sync();
  await list_sup_workers.sync();
  await messages.sync();
}
init()
   // module.exports.init = init
