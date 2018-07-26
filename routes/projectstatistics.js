var express = require('express');
var router = express.Router();
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
        messages.push(await sql_api.GetCountSendForProject(managers[i].dataValues.to_id,req.query.proj))
        timeresp.push(await  sql_api.GetRespTimeForProject(managers[i].dataValues.to_id,req.query.proj))
    }
        var proj = req.query.proj;
        res.render('projectstatistics', {
            zagolovok: 'Статистика по ' + proj,
            managerName: managerName,
            messages: messages,
            timeresp: timeresp,
            managers: managers
        });
});

module.exports = router;
