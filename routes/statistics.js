var express = require('express');
var router = express.Router();
var sql_api = require('../api/sql_api');


/* GET statis page. */
router.get('/', async function(req, res, next) {

        let managers =  await sql_api.GetManagers()
        let srTimeAns = await sql_api.GetRespTime()

        let messagesGroup = await sql_api.GetAllMessagesGroup()
       let messagesLs = await sql_api.GetAllMessagesLs()
        res.render('statistics', {
            zagolovok: 'Статистика по работникам',
            srTimeAns: srTimeAns,
            messagesGroup : messagesGroup,
            messagesLs : messagesLs,
            managers: managers
        });

});

module.exports = router;
