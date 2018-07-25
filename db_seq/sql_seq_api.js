var db = require('./db_init')
const sequelize = require('./pgbase-connector');
const Sequelize = require('sequelize');

// получить проекты

async function GetProjects() {
    var result = await db.Project.findAll();
    return result;
}

async function GetManagers() {

    var result = await pgapi.pool.query('select count(DISTINCT new_schema.messages_group.chat_id),new_schema.messages_group.to_id, ' +
        'new_schema.list_sup_workers.name from new_schema.messages_group inner join  new_schema.list_sup_workers on(tel_number = to_id) group by to_id, name');


    var result = await db.Project.findAll();
    return result;
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
module.exports.GetManagers = GetManagers
module.exports.GetMessForManagerLs = GetMessForManagerLs
module.exports.GetPersonName = GetPersonName
module.exports.GetMessForManager = GetMessForManager