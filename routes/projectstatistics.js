var express = require('express');
var router = express.Router();
var sql_api = require('../api/sql_api')
/* GET statis page. */
router.get('', async function(req, res, next) {
    let managers = await sql_api.GetManagersByProjectId(req.query.proj)
    let managerName = []
    let messages = []
    let timeresp = []
    for (let i = 0; i<managers.rowCount;i++)
    {
        managerName.push(await sql_api.GetPersonName(managers.rows[i].to_id))
        messages.push(await sql_api.GetCountSendForProject(managers.rows[i].to_id,req.query.proj))
        timeresp.push(await  sql_api.GetRespTimeForProject(managers.rows[i].to_id,req.query.proj))
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
