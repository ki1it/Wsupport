var db = require('./db_init')
const sequelize = require('./pgbase-connector');
const Sequelize = require('sequelize');

// получить проекты
async function GetProjects() {
    var result = await db.Project.findAll();
    return result;
}

// среднее время ответа
async function GetRespTimeForProject(tel,chat_id) {
    var result = await db.Message_in_Group.sequelize.fn('AVG',{
            col:"react_time",
            where:{
                from_tp: true,
                to_id: tel,
                chat_id: chat_id
            }
    })
    return result
}
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
module.exports.GetProjects = GetProjects
module.exports.GetMessForManagerLs = GetMessForManagerLs
module.exports.GetPersonName = GetPersonName
module.exports.GetMessForManager = GetMessForManager
module.exports.GetRespTimeForProject = GetRespTimeForProject