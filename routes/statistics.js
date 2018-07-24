var express = require('express');
var router = express.Router();
var sql_api = require('../api/sql_api')

/* GET statis page. */
router.get('/', async function(req, res, next) {
    if(req.query.proj) {
        var proj = req.query.proj;
        var srTimeAns = [15, 10];
        var managers = ['loh', 'pidr'];
        var countProjectsIn = [1, 1];
        var countAns = [1, 1];
        var countMan = 2;
        let name = await sql_api.GetProjectName(proj);
        name = name.rows[0].name;
        res.render('statistics', {
            zagolovok: 'Статистика по ' + name,
            countMan: countMan,
            countAns: countAns,
            countProjectsIn: countProjectsIn,
            vls: '-',
            srTimeAns: srTimeAns,
            managers: managers
        });
    }
    else {
        let managers =  await sql_api.GetManagers()
        let srTimeAns = await sql_api.GetRespTime()

        let messagesGroup = await sql_api.GetAllMessagesGroup()
        let messagesLs = await sql_api.GetAllMessagesLs()
        //res.render('statistics', {countMan:countMan,countAns:countAns, countProjectsIn: countProjectsIn, srTimeAns:srTimeAns,managers:managers});
        res.render('statistics', {
            zagolovok: 'Статистика по работникам',
            srTimeAns: srTimeAns,
            messagesGroup : messagesGroup,
            messagesLs : messagesLs,
            managers: managers
        });
    }

});

module.exports = router;
