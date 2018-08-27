let pgapi = require('../api/pg_api')

async function GetProjects() {
let result = await pgapi.pool.query('select * from new_schema.list_projects');
//console.log(result);
return result;
}
async function GetManagers() {
    let result = await pgapi.pool.query('select count(DISTINCT new_schema.messages_group.chat_id),new_schema.messages_group.to_id, ' +
        'new_schema.list_sup_workers.name from new_schema.messages_group inner join  new_schema.list_sup_workers on(tel_number = to_id) group by to_id, name');
//console.log(result);
    return result;
}

async function GetAllMessagesGroup() {
    let result = await pgapi.pool.query('select count(DISTINCT new_schema.messages_group.id),new_schema.messages_group.to_id' +
        ' from new_schema.messages_group,new_schema.list_sup_workers where from_tp=true group by to_id order by to_id');
//console.log(result);
    return result;
}
async function GetRespTime() {
    let result = await pgapi.pool.query('select avg(new_schema.messages_group.react_time), new_schema.messages_group.to_id from new_schema.messages_group where from_tp = true group by to_id order by to_id');
//console.log(result);
    return result;
}

async function GetAllMessagesLs() {
    let result = await pgapi.pool.query('select count(DISTINCT new_schema.messages.id),new_schema.messages.to_id ' +
        'from new_schema.messages where from_tp=true group by to_id order by to_id');
//console.log(result);
    return result;
}


async function GetPersonId(name) {
    let result = await pgapi.pool.query('select new_schema.list_sup_workers.tel_number from new_schema.list_sup_workers where name =$1',[name]);
//console.log(result);
    return result;
}
// -----------------------------------------------
async function GetProjectsById(tel) {
    let result = await pgapi.pool.query('select new_schema.messages_group.chat_id from new_schema.messages_group where to_id=$1  group by chat_id', [tel]);
    return result
}

async function GetManagersByProjectId(chat_id) {
    let result = await pgapi.pool.query('select new_schema.messages_group.to_id from new_schema.messages_group where chat_id=$1  group by to_id', [chat_id]);
    return result
}

async function GetProjectName(chat_id) {
    let result = await pgapi.pool.query('select new_schema.list_projects.name from new_schema.list_projects where chat_id = $1', [chat_id]);
    return result
}

async function GetCountSendForProject(tel,chat_id) {
    let result = await pgapi.pool.query('select count(DISTINCT new_schema.messages_group.id)from new_schema.messages_group,new_schema.list_sup_workers where to_id = $1 and chat_id =$2 and from_tp = true ', [tel,chat_id]);
    return result
}


async function GetCountGetForProject(tel,chat_id) {
    let result = await pgapi.pool.query('select count(DISTINCT new_schema.messages_group.id)from new_schema.messages_group,new_schema.list_sup_workers where to_id = $1 and chat_id =$2 and from_tp = false ', [tel,chat_id]);
    return result
}


async function GetRespTimeForProject(tel,chat_id) {
    let result = await pgapi.pool.query('select avg(new_schema.messages_group.react_time) from new_schema.messages_group where from_tp = true and to_id = $1 and chat_id = $2', [tel,chat_id]);
    return result
}
async function GetMessForManager(tel) {
    let result = await pgapi.pool.query('select count(DISTINCT new_schema.messages_group.id) from new_schema.messages_group where from_tp=true and to_id = $1', [tel]);
    return result
}

async function GetMessForManagerLs(tel) {
    let result = await pgapi.pool.query('select count(DISTINCT new_schema.messages.id) from new_schema.messages where from_tp=true and to_id = $1', [tel]);
    return result
}
async function GetPersonName(id) {
    let result = await pgapi.pool.query('select new_schema.list_sup_workers.name from new_schema.list_sup_workers where tel_number =$1',[id]);
//console.log(result);
    return result;
}
//console.log(result);
    module.exports.GetProjects = GetProjects
    module.exports.GetManagers = GetManagers
    module.exports.GetAllMessagesGroup = GetAllMessagesGroup
    module.exports.GetAllMessagesLs = GetAllMessagesLs
    module.exports.GetRespTime = GetRespTime
    module.exports.GetPersonId = GetPersonId
    module.exports.GetProjectsById = GetProjectsById
    module.exports.GetCountSendForProject = GetCountSendForProject
    module.exports.GetCountGetForProject = GetCountGetForProject
    module.exports.GetRespTimeForProject = GetRespTimeForProject
    module.exports.GetProjectName = GetProjectName
    module.exports.GetMessForManager = GetMessForManager
    module.exports.GetMessForManagerLs = GetMessForManagerLs
    module.exports.GetManagersByProjectId = GetManagersByProjectId
    module.exports.GetPersonName = GetPersonName