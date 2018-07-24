// async function GetProjects() {
//     var result = await pgapi.pool.query('select * from new_schema.list_projects');
// //console.log(result);
//     return result;
// }
// async function GetManagers() {
//     var result = await pgapi.pool.query('select count(DISTINCT new_schema.messages_group.chat_id),new_schema.messages_group.to_id, ' +
//         'new_schema.list_sup_workers.name from new_schema.messages_group inner join  new_schema.list_sup_workers on(tel_number = to_id) group by to_id, name');
// //console.log(result);
//     return result;
// }
const list_projects = require('./list_projects')
const messages_group = require('./messages_group')
const messages = require('./messages')
const list_sup_workers = require('./list_sup_workers')
const db = require('./db_init')

async function getAllManagers() {
    let res = await list_sup_workers.findAll()
    return res
}
async  function getAllProjects(){
    let res = await  list_projects.findAll()
    return res;
}

module.exports.getAllManagers = getAllManagers()
