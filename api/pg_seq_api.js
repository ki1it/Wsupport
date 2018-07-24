const Sequelize = require('sequelize')

const List_projects = sequelize.import('../bd_models/list_projects')
const List_sup_workers = sequelize.import('../bd_models/list_sup_workers')
const Messages = sequelize.import('../bd_models/messages')
const Messages_group = sequelize.import('../bd_models/messages_group')
List_projects.sync()
List_projects.findAll().then(users => {
  console.log(users)
})
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })
