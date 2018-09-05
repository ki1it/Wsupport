var express = require('express');
var router = express.Router();
// var sql_api = require('../api/sql_api');
var sql_api = require('../db_seq/sql_seq_api');

/* GET statis page. */
router.get('/', async function (req, res, next) {



    res.render('monkeys', {
        zagolovok: 'Статистика по работникам',
        // srTimeAns: srTimeAns,
        // messagesGroup: messagesGroup,
        // messagesLs: messagesLs,

        managers: managers,
        messgr: messgr,
        messls: messls,
        timeresp: timeresp
    });

});

module.exports = router;
