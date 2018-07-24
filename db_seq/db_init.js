const list_projects = require('./list_projects')
const messages_group = require('./messages_group')
const messages = require('./messages')
const list_sup_workers = require('./list_sup_workers')
// const Raffle = require('Raffle')

//list_projects.hasMany(messages_group, { foreignKey:'chat_id', sourceKey:'chat_id',  onUpdate: 'cascade', onDelete: 'cascade' })
//Raffle.hasMany(Winner, { as: 'Winners', foreignKeyConstraint: true, onUpdate: 'cascade', onDelete: 'cascade' })

// Raffle.belongsTo(Lottery, { foreignKeyConstraint: true })
// Winner.belongsTo(Raffle, { foreignKeyConstraint: true })
async function init() {
  await messages_group.sync();
  await list_projects.sync();
  await list_sup_workers.sync();
  await messages.sync();
}
init()
module.exports = init()