var express = require('express');
var router = express.Router();
var sql_api = require('../api/sql_api')

var seq_api = require('../db_seq/sql_seq_api')

/* GET statis page. */
router.get('/', async function(req, res, next) {

        let managers =  await seq_api.getAllManagers()
       // let srTimeAns = await sql_api.GetRespTime()

       // let messagesGroup = await sql_api.GetAllMessagesGroup()
      //  let messagesLs = await sql_api.GetAllMessagesLs()
        res.render('statistics', {
            zagolovok: 'Статистика по работникам',
            managers: managers
        });

});

module.exports = router;
