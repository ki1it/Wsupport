const list_projects = require('./list_projects')
const messages_group = require('./messages_group')
const messages = require('./messages')
const list_sup_workers = require('./list_sup_workers')
const db = require('./db_init')

// получить всех манагеров
async function getAllManagers() {
    let res = await list_sup_workers.findAll()
    return res
}

// получить все проекты
async  function getAllProjects(){
    let res = await  list_projects.findAll()
    return res;
}

module.exports.getAllManagers = getAllManagers
module.exports.getAllProjects = getAllProjects