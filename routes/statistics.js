var express = require('express');
var router = express.Router();
// var sql_api = require('../api/sql_api');
var sql_api = require('../db_seq/sql_seq_api');

/* GET statis page. */
router.get('/', async function (req, res, next) {

    let managers = await sql_api.GetManagers()

    let srTimeAns = await sql_api.GetRespTime()

    let messagesGroup = await sql_api.GetAllMessagesGroup()

    let messagesLs = await sql_api.GetAllMessagesLs()

    let messgr = []
    let messls = []
    let timeresp = []
    for (let i = 0; i < managers.length; i++) {

        if (messagesGroup === undefined || messagesGroup[i] === undefined || messagesGroup.length === 0 || messagesGroup[i].length === 0) {
            messgr.push(0)
        }
        else {
            messgr.push(messagesGroup[i].dataValues.count)
        }

        if (messagesLs === undefined || messagesLs[i] === undefined || messagesLs.length === 0 || messagesLs[i].length === 0) {

            messls.push(0)
        }
        else {
            messls.push(messagesLs[i].dataValues.count)
        }

        if (srTimeAns === undefined || srTimeAns[i] === undefined || srTimeAns.length == 0 || srTimeAns[i].length == 0) {
            timeresp.push(0)
        }
        else
            timeresp.push(srTimeAns[i].dataValues.avg)
    }

    res.render('statistics', {
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
