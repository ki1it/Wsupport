let db = require('./db_init')
const Sequelize = require('sequelize');
const sequelize = require('./pgbase-connector');
var moment = require('moment');

// получить проекты
async function GetProjects() {
    let result = await db.Project.findAll();
    return result;
}

async function ChangeName(newName, ch){
   let result =  await db.Project.update({name: newName, where:{chat_id: ch}});
    return result;
}

async function GetProjectName(chat_id) {
    let result = await db.Project.findAll({
            attributes: ['name'],
            where: {
                chat_id: chat_id
            }
        }
    )
        .catch((err) => {
            console.log(err)
        })
    return result
}

// количество ответов в проекте
async function GetCountSendForProject(tel, chat_id) {
    let result = await db.Message_in_Group.count({
        distinct: true,
        col: 'id',
        where: {
            from_tp: true,
            chat_id: chat_id,
            to_id: tel
        }
    })
        .catch((err) => {
            console.log(err)
        })
    return result
}

// количество принятых в проекте
async function GetCountGetForProject(tel, chat_id) {
    let result = await db.Message_in_Group.count({
        distinct: true,
        col: 'id',
        where: {
            from_tp: false,
            chat_id: chat_id,
            to_id: tel
        }
    })
        .catch((err) => {
            console.log(err)
        })
    return result
}

// среднее время ответа
async function GetRespTimeForProject(tel, chat_id) {
    let result = await
        db.Message_in_Group.findAll({
            attributes: ['to_id', [sequelize.fn('AVG', sequelize.col('react_time')), "avg"]],
            where: {
                to_id: tel,
                chat_id: chat_id,
                from_tp: true
            },
            group: ['to_id'],
            order: ['to_id']
        })
            .catch((err) => {
                console.log(err)
            })

    return result
}

//GetRespTimeForProject('+79069624310', -1001300656234)
//
async function GetMessForManager(tel) {
    let result = await db.Message_in_Group.count({
        distinct: true,
        col: "id",
        where: {
            from_tp: true,
            to_id: tel
        }
    })
        .catch((err) => {
            console.log(err)
        })
    // await pgapi.pool.query('select count(DISTINCT new_schema.messages_group.id) from new_schema.messages_group where from_tp=true and to_id = $1', [tel]);
    return result
}

// получить имя по телефону
async function GetPersonName(tel_number) {
    let result = await db.Worker.findAll({
        attributes: ['name'],
        where: {
            tel_number: tel_number
        }
    });
    return result;
}

// колво сообщений для манагера в лс
async function GetMessForManagerLs(tel) {
    let result = await db.Message.count({
        distinct: true,
        col: "id",
        where: {
            from_tp: true,
            to_id: tel
        }
    })
    return result
}

async function GetManagersByProjectId(chat_id) {

    let result = await db.Message_in_Group.findAll({
        attributes: ['to_id'],
        group: ['to_id'],
        where: {
            chat_id: chat_id
        }
    })
    return result
}

async function GetAllMessagesLs() {
    let result = await db.Message.findAll({
        attributes: ['to_id', [sequelize.fn('count', sequelize.fn('DISTINCT', sequelize.col('message_id'))), "count"]],
        where: {
            from_tp: true
        },
        group: ['to_id'],
        order: ['to_id']

    })
//console.log(result);
    return result
}

async function GetAllMessagesGroup() {
    let result = await db.Message_in_Group.findAll({
        attributes: ['to_id', [sequelize.fn('count', sequelize.fn('DISTINCT', sequelize.col('message_id'))), "count"]],
        where: {
            from_tp: true
        },
        group: ['to_id'],
        order: ['to_id']

    })
    return result;
}
async function GetPersonId(name) {
    let result = await db.Worker.findAll({
        where: {
            name: name
        }
    })
        .catch((err) => {
            console.log(err)
        })
    return result;
}

async function GetProjectsById(tel) {
    let result = await
        db.Message_in_Group.findAll({
            attributes: ['chat_id'],
            group: ['chat_id'],
            where: {
                to_id: tel
            }
        })
            .catch((err) => {
                console.log(err)
            })

    //pgapi.pool.query('select new_schema.messages_group.chat_id from new_schema.messages_group where to_id=$1  group by chat_id', [tel]);
    return result
}

async function GetRespTime() {
    let result = await
        db.Message_in_Group.findAll({
            attributes: ['to_id', [sequelize.fn('AVG', sequelize.col('react_time')), "avg"]],
            where: {
                from_tp: true
            },
            group: ['to_id'],
            order: ['to_id']
        })
            .catch((err) => {
                console.log(err)
            })
    return result;
}

// async function GetManagers() {
//     let result = await pgapi.pool.query('select count(DISTINCT new_schema.messages_group.chat_id),new_schema.messages_group.to_id, ' +
//         'new_schema.list_sup_workers.name from new_schema.messages_group inner join  new_schema.list_sup_workers on(tel_number = to_id) group by to_id, name');
// //console.log(result);
//     return result;
// }

async function GetManagers() {
    let result = await db.Message_in_Group.findAll({
        attributes: ['Message_in_Group.to_id', 'Worker.name', [sequelize.fn('count', sequelize.col('Message_in_Group.chat_id')), "count"]],
        include: [{model: db.Worker, as: 'Worker'}],
        group: ['to_id', 'name', 'Worker.id'],
        order: ['to_id'],
        where: {
            from_tp:true
        }
    })
        .catch((err) => {
            console.log(err)
        })
    return result;
}

async function GetMessForPersonForWeek(tel) {
    const Op = Sequelize.Op;
    let result = []
    for (i = 0; i < 7; i++) {
        let res = await db.Message_in_Group.count({
            distinct: true,
            col: 'message_id',
            where: {
                to_id: tel,
                createdAt: {
                    [Op.gt]: moment().subtract(i+1, 'days').toDate(),
                    [Op.lt]: moment().subtract(i, 'days').toDate()
            },
            from_tp:true


        }
    })
        .catch((err) => {
            console.log(err)
        })
        result.push(res)
    }
    return result;
}

async function DownloadMessForProject(chat_id){
    let messansw = await db.Message_in_Group.findAll(
        {
            where:{
                reply_to:{
                    [Op.ne]:0
                },
                from_tp:true
            }
        }
    )

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
module.exports.GetAllMessagesGroup = GetAllMessagesGroup
module.exports.GetAllMessagesLs = GetAllMessagesLs
module.exports.GetPersonId = GetPersonId
module.exports.GetMessForPersonForWeek = GetMessForPersonForWeek
module.exports.ChangeName = ChangeName