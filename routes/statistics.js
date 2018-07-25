var express = require('express');
var router = express.Router();
// var sql_api = require('../api/sql_api');
var sql_api = require('../db_seq/sql_seq_api');

/* GET statis page. */
router.get('/', async function(req, res, next) {

        let managers =  await sql_api.GetManagers()
        console.log(managers)
        let srTimeAns = await sql_api.GetRespTime()
    console.log(srTimeAns)
        let messagesGroup = await sql_api.GetAllMessagesGroup()
    console.log(messagesGroup)
       let messagesLs = await sql_api.GetAllMessagesLs()
    console.log(messagesLs )

        res.render('statistics', {
            zagolovok: 'Статистика по работникам',
            srTimeAns: srTimeAns,
            messagesGroup : messagesGroup,
            messagesLs : messagesLs,
            managers: managers
        });

});

module.exports = router;
