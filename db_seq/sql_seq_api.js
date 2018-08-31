let db = require('./db_init')
const Sequelize = require('sequelize');
const sequelize = require('./pgbase-connector');
var moment = require('moment');
const Op = Sequelize.Op;

// получить проекты
async function GetProjects() {
    let result = await db.Project.findAll({
        where: {
            hidden: false
        }
    });
    return result;
}
async function GetProjectsHideen() {
    let result = await db.Project.findAll({
        where: {
            hidden: true
        }
        }

    );
    return result;
}

async function ChangeName(newName, ch) {
    let result = await db.Project.update({
            name: newName,
        }, {
            where: {
                chat_id: parseInt(ch)
            },
        returning: true,
        plain: true
        }
    )
        .then(function (result) {
            console.log(result);
        })
        .catch((err) => {
            console.log(err)
        });
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
async function GetCountSendForProject(tel, chat_id, startDate, finDate) {
    let result = await db.Message_in_Group.count({
        distinct: true,
        col: 'id',
        where: {
            from_tp: true,
            chat_id: chat_id,
            to_id: tel,
            createdAt: {

                [Op.gt]: startDate.toDate(),
                [Op.lt]: finDate.toDate()
            },
        }
    })
        .catch((err) => {
            console.log(err)
        })
    return result
}

// количество принятых в проекте
async function GetCountGetForProject(tel, chat_id, startDate, finDate) {
    let result = await db.Message_in_Group.count({
        distinct: true,
        col: 'id',
        where: {
            from_tp: false,
            chat_id: chat_id,
            to_id: tel,
            createdAt: {

                [Op.gt]: startDate.toDate(),
                [Op.lt]: finDate.toDate()
            },
        }
    })
        .catch((err) => {
            console.log(err)
        })
    return result
}

// среднее время ответа
async function GetRespTimeForProject(tel, chat_id, startDate, finDate) {
    let result = await
        db.Message_in_Group.findAll({
            attributes: ['to_id', [sequelize.fn('AVG', sequelize.col('react_time')), "avg"]],
            where: {
                to_id: tel,
                chat_id: chat_id,
                from_tp: true,
                createdAt: {

                    [Op.gt]: startDate.toDate(),
                    [Op.lt]: finDate.toDate()
                }
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
async function GetMessForManager(tel,startDate,finDate) {
    let result = await db.Message_in_Group.count({
        distinct: true,
        col: "id",
        where: {
            createdAt: {
                [Op.gt]: startDate.toDate(),
                [Op.lt]: finDate.toDate()
            },
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
async function GetMessForManagerLs(tel, startDate, finDate) {
    let result = await db.Message.count({
        distinct: true,
        col: "message_id",
        where: {
            createdAt: {
                [Op.gt]: startDate.toDate(),
                [Op.lt]: finDate.toDate()
            },
            from_tp: true,
            to_id: tel
        }
    })
    console.log(result)
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
    console.log(moment())
console.log(result);
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
    console.log(result)
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
    console.log(result)
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
            from_tp: true
        }
    })
        .catch((err) => {
            console.log(err)
        })

    return result;
}
async function GetManagers1() {
    let result = await db.Worker.findAll({
        attributes: ['Message_in_Group.to_id', 'Worker.name', [sequelize.fn('count', sequelize.col('Message_in_Group.chat_id')), "count"]],
        include: [{model: db.Message_in_Group, as: 'Message_in_Group'}],
        group: ['tel_number'],
        order: ['tel_number'],
        where: {
            'Message_in_Group.from_tp': true
        }
    })
        .catch((err) => {
            console.log(err)
        })

    return result;
}

async function GetMessForPersonForTimeDays(tel, startDate, finDate, cou) {

    let result = []
    let datetemp = startDate.clone()
    datetemp.startOf('day')
    for (let i = 0; i <= cou; i++) {

        let res = await db.Message_in_Group.count({
            distinct: true,
            col: 'message_id',
            where: {
                to_id: tel,
                createdAt: {
                    //[Op.gt]:

                    [Op.gt]: datetemp.toDate(),
                    [Op.lt]: datetemp.add(1, 'days').toDate()
                },
                from_tp: true


            }
        })
            .catch((err) => {
                console.log(err)
            })
        result.push(res)
    }
    return result;
}

async function GetMessForPersonForTimeHours(tel, startDate) {

    let result = []
    let datetemp = startDate.clone()
    for (let i = 0; i <= 24; i++) {

        let res = await db.Message_in_Group.count({
            distinct: true,
            col: 'message_id',
            where: {
                to_id: tel,
                createdAt: {
                    //[Op.gt]:

                    [Op.gt]: datetemp.toDate(),
                    [Op.lt]: datetemp.add(1, 'h').toDate()
                },
                from_tp: true


            }
        })
            .catch((err) => {
                console.log(err)
            })
        result.push(res)
    }
    return result;
}
async function DownloadMessPersonForTime(tel, startDate, finDate) {
    const Op = Sequelize.Op;
    let result1 = []
    let result2 = []
    let result3 = []
    let result4 = []
    startDate.startOf('day')
    finDate.endOf('day')
    let res1 = await db.Message_in_Group.findAll({
        attributes: ['reply_to', 'text', 'createdAt', 'chat_id'],
        where: {
            to_id: tel,
            //reply_to: {[Op.ne]: 0},
            createdAt: {

                [Op.gt]: startDate.toDate(),
                [Op.lt]: finDate.toDate()
            },
            from_tp: true


        }
    })
        .catch((err) => {
            console.log(err)
        })
    result1.push(res1)
    console.log('count: '+result1[0].length)
    for (let i = 0; i < result1[0].length; i++) {
        let res2 = await db.Message_in_Group.findAll({
            attributes: ['text', 'createdAt'],
            where: {
                message_id: result1[0][i].dataValues.reply_to
            }
        })
            .catch((err) => {
                console.log(err)
            })
        result2.push(res2)
    }
    let res3 = await db.Message.findAll({
        attributes: ['reply_to', 'text', 'createdAt'],
        where: {
            to_id: tel,
            //reply_to: {[Op.ne]: 0},
            createdAt: {
                [Op.gt]: startDate.toDate(),
                [Op.lt]: finDate.toDate()
            },
            from_tp: true


        }
    })
        .catch((err) => {
            console.log(err)
        })
    result3.push(res3)
    console.log('count: '+result3[0].length)
    for (let i = 0; i < result3[0].length; i++) {
        let res4 = await db.Message.findAll({
            attributes: ['text', 'createdAt'],
            where: {
                message_id: result3[0][i].dataValues.reply_to
            }
        })
            .catch((err) => {
                console.log(err)
            })
        result4.push(res4)
    }
    var csv = 'Вопрос,Время вопроса,Ответ,Время ответа,Чат\n';

    for (let i = 0; i < result1[0].length; i++) {
        let str1 = 'Сообщение не найдено'
        let str2 = 'Сообщение не найдено'
        let str3 = 'Сообщение не найдено'
        let str4 = 'Сообщение не найдено'
        let str5 = await  GetProjectName( result1[0][i].dataValues.chat_id)
        str5 = str5["0"].dataValues.name

        if(result2[i][0] != undefined) {
            str1 = result2[i][0].dataValues.text.replace(/,/g, ';')
            str2 = result2[i][0].dataValues.createdAt

        }
        if(result1[0][i] != undefined) {
            str3 = result1[0][i].dataValues.text.replace(/,/g, ';')
            str4 = result1[0][i].dataValues.createdAt
        }


        csv += str1 + ',' + str2 + ',' + str3 + ',' + str4 + ',' + str5
        csv += "\n";
    }
    csv += 'Дальше,из,личных,сообщений\n'
    for (let i = 0; i < result3[0].length; i++) {
        let str1 = 'Сообщение не найдено'
        let str2 = 'Сообщение не найдено'
        let str3 = 'Сообщение не найдено'
        let str4 = 'Сообщение не найдено'

        if(result4[i][0] != undefined) {
            str1 = result4[i][0].dataValues.text.replace(/,/g, ';')
            str2 = result4[i][0].dataValues.createdAt

        }
        if(result3[0][i] != undefined) {
            str3 = result3[0][i].dataValues.text.replace(/,/g, ';')
            str4 = result3[0][i].dataValues.createdAt
        }
        csv += str1 + ',' + str2 + ',' + str3 + ',' + str4
        csv += "\n";
    }
    return csv;
}

async function hide_project(ch) {
    let result = await db.Project.update({
            hidden: true,
        }, {
            where: {
                chat_id: parseInt(ch)
            },
            returning: true,
            plain: true
        }
    )
        .then(function (result) {
            console.log(result);
        })
        .catch((err) => {
            console.log(err)
        });
    return result;
}
async function show_project(ch) {
    let result = await db.Project.update({
            hidden: false,
        }, {
            where: {
                chat_id: parseInt(ch)
            },
            returning: true,
            plain: true
        }
    )
        .then(function (result) {
            console.log(result);
        })
        .catch((err) => {
            console.log(err)
        });
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
module.exports.GetAllMessagesGroup = GetAllMessagesGroup
module.exports.GetAllMessagesLs = GetAllMessagesLs
module.exports.GetPersonId = GetPersonId
module.exports.GetMessForPersonForTimeDays = GetMessForPersonForTimeDays
module.exports.ChangeName = ChangeName
module.exports.DownloadMessPersonForTime = DownloadMessPersonForTime
module.exports.GetMessForPersonForTimeHours = GetMessForPersonForTimeHours
module.exports.hide_project = hide_project
module.exports.show_project = show_project
module.exports.GetProjectsHideen = GetProjectsHideen