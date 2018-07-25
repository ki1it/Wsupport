var db = require('./db_init')
const sequelize = require('./pgbase-connector');
const Sequelize = require('sequelize');

// получить проекты
async function GetProjects() {
    var result = await db.Project.findAll();
    return result;
}

// количество ответов в проекте
async function GetCountGetForProject(tel,chat_id) {
    var result = await db.Message_in_Group.count({
        distinct: true,
        include: [Worker],
        where: {
            from_tp: true,
            chat_id: chat_id,
            to_id: tel
        }
    })
//'select count(DISTINCT new_schema.messages_group.id)from new_schema.messages_group,new_schema.list_sup_workers where to_id = $1 and chat_id =$2 and from_tp = false ', [tel,chat_id]
    return result
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
module.exports.GetCountGetForProject = GetCountGetForProject
module.exports.GetRespTimeForProject = GetRespTimeForProject
//    module.exports.
 //   module.exports.
//    module.exports.
  //  module.exports.