var db = require('../db_seq/db_init')
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

// async function GetCountSendForProject(tel,chat_id) {
//     var result = db.
//        await pgapi.pool.query('select count(DISTINCT new_schema.messages_group.id)from new_schema.messages_group,new_schema.list_sup_workers where to_id = $1 and chat_id =$2 and from_tp = true ', [tel,chat_id]);
//     return result
// }
async function GetCountGetForProject(tel,chat_id) {
    var result = await pgapi.pool.query('select count(DISTINCT new_schema.messages_group.id)from new_schema.messages_group,new_schema.list_sup_workers where to_id = $1 and chat_id =$2 and from_tp = false ', [tel,chat_id]);
    return result
}
async function GetRespTimeForProject(tel,chat_id) {
    var result = await pgapi.pool.query('select avg(new_schema.messages_group.react_time) from new_schema.messages_group where from_tp = true and to_id = $1 and chat_id = $2', [tel,chat_id]);
    return result
}