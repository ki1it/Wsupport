var express = require('express');
var router = express.Router();
var moment = require('moment');
// var sql_api = require('../api/sql_api')
var sql_api = require('../db_seq/sql_seq_api')
/* GET statis page. */
router.get('', async function(req, res, next) {
    let managers = await sql_api.GetManagersByProjectId(req.query.proj)
    let managerName = []
    let messages = []
    let timeresp = []
    for (let i = 0; i<managers.length;i++)
    {
        managerName.push(await sql_api.GetPersonName(managers[i].dataValues.to_id))
        messages.push(await sql_api.GetCountSendForProject(managers[i].dataValues.to_id,req.query.proj, moment().subtract(40,'years'), moment()))
        let time = await  sql_api.GetRespTimeForProject(managers[i].dataValues.to_id,req.query.proj, moment().subtract(40,'years'), moment())
        if (time.length == 0) {
            timeresp.push(0)
        }
        else
            timeresp.push(time[0].dataValues.avg)
    }
        let proj =  await sql_api.GetProjectName(req.query.proj);
        res.render('projectstatistics', {
            zagolovok: 'Статистика по ' + proj["0"].dataValues.name,
            managerName: managerName,
            messages: messages,
            timeresp: timeresp,
            managers: managers
        });
});

module.exports = router;
