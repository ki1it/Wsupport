var db = require('./db_init')
const sequelize = require('./pgbase-connector');
const Sequelize = require('sequelize');

// получить проекты
async function GetProjects() {
    var result = await db.Project.findAll();
    return result;
}

async function GetProjectName(chat_id) {
    var result = await db.Project.getAll({
        col: 'name',
        where:{
            chat_id: chat_id
        }
    }
    )
    return result
}
// количество ответов в проекте
async function GetCountSendForProject(tel,chat_id) {
    var result = await db.Message_in_Group.count({
        col: 'id',
        distinct: true,
        include: [Worker],
        where: {
            from_tp: true,
            chat_id: chat_id,
            to_id: tel
        }
    })
    return result
}
// количество принятых в проекте
async function GetCountGetForProject(tel,chat_id) {
    var result = await db.Message_in_Group.count({
        distinct: true,
        col: 'id',
        include: [Worker],
        where: {
            from_tp: false,
            chat_id: chat_id,
            to_id: tel
        }
    })
    return result
}
// среднее время ответа
async function GetRespTimeForProject(tel,chat_id) {
    var result = await db.Message_in_Group.findAll(sequelize.fn('AVG',{
            col: 'react_time',
            where:{
                from_tp: true,
                to_id: tel,
                chat_id: chat_id
            }
    }))
    return result
}
//
async function GetMessForManager(tel) {
    var result = await db.Message_in_Group.count({
        distinct: true,
        col:"id",
        where:{
            from_tp:true,
            to_id : tel
        }
    })
    // await pgapi.pool.query('select count(DISTINCT new_schema.messages_group.id) from new_schema.messages_group where from_tp=true and to_id = $1', [tel]);
    return result
}
// получить имя по телефону
async function GetPersonName(tel_number) {
    var result = await db.Worker.findAll({
        attributes: ['name'],
        where: {
            tel_number: tel_number
        }
    });
    return result;
}
// колво сообщений для манагера в лс
async function GetMessForManagerLs(tel) {
    var result = await db.Message.count({
        distinct: true,
        col:"id",
        where:{
            from_tp:true,
            to_id : tel
        }
    })
    return result
}

async function GetManagersByProjectId(chat_id) {
    var result = await db.Message_in_Group.getAll({
        col:'to_id',
        group: ['to_id'],
        where: {
            chat_id: chat_id
        }
    })
    return result
}

async function GetProjectsById(tel) {
    var result = await db.Message_in_Group.findAll({
        attributes: ['chat_id'],
        group: ['chat_id'],
        where: {
            id: tel
        }
    })

    //pgapi.pool.query('select new_schema.messages_group.chat_id from new_schema.messages_group where to_id=$1  group by chat_id', [tel]);
    return result
}

async function GetRespTime() {
    var result = await db.Message_in_Group.findAll(sequelize.fn('AVG',{
        col: 'react_time',
        where: {
            from_tp: true
        },
        group: ['to_id'],
        order: ['to_id']
    }))
    return result;
}


async function GetManagers() {
    var result = await db.Message_in_Group.count({
        col: 'chat_id',
        include: ['Worker'],
        group: ['to_id', 'name']
    })
    return result;
}

module.exports.GetProjects = GetProjects
module.exports.GetMessForManagerLs = GetMessForManagerLs
module.exports.GetPersonName = GetPersonName
module.exports.GetMessForManager = GetMessForManager
module.exports.GetCountGetForProject = GetCountGetForProject
module.exports.GetRespTimeForProject = GetRespTimeForProject
module.exports.GetCountSendForProject = GetCountSendForProject
module.exports.GetProjectName = GetProjectName
module.exports.GetProjectsById = GetProjectsById
module.exports.GetManagersByProjectId = GetManagersByProjectId
module.exports.GetRespTime = GetRespTime
module.exports.GetManagers = GetManagers
//  module.exports.