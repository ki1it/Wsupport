const list_projects = require('./project')
const messages_group = require('./message_in_group')
const messages = require('./message')
const list_sup_workers = require('./sup_worker')
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