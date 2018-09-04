var express = require('express');
var router = express.Router();
// var sql_api = require('../api/sql_api');
var sql_api = require('../db_seq/sql_seq_api');

/* GET statis page. */
router.get('/', async function (req, res, next) {

    let managers = await sql_api.GetManagers()







    let projects = await sql_api.GetProjeectsForManagers()

    let messgr = []
    let messls = []
    let timeresp = []
    let countProj = []
    for (let i = 0; i < managers.length; i++) {

        let messagesGroup = await sql_api.GetAllMessagesGroup(managers[i].dataValues.tel_number)
        if (messagesGroup === undefined || messagesGroup[0] === undefined || messagesGroup.length === 0 ) {
            messgr.push(0)
        }
        else {
            let sum = 0
            for(let j = 0; j < messagesGroup.length; j++)
                sum+=parseInt(messagesGroup[j].dataValues.count)
            messgr.push(sum)
        }

        let messagesLs = await sql_api.GetAllMessagesLs(managers[i].dataValues.tel_number)
        if (messagesLs === undefined || messagesLs[0] === undefined || messagesLs.length === 0 ) {

            messls.push(0)
        }
        else {
            messls.push(messagesLs[0].dataValues.count)
        }

        let srTimeAns = await sql_api.GetRespTime(managers[i].dataValues.tel_number)
        if (srTimeAns === undefined || srTimeAns[0] === undefined || srTimeAns.length === 0 ) {
            timeresp.push(0)
        }
        else {
            let sum = 0
            let cou = 0
            for(let j = 0; j < srTimeAns.length; j++) {
                sum += parseInt(srTimeAns[j].dataValues.avg) * parseInt(srTimeAns[j].dataValues.count)
                cou += parseInt(srTimeAns[j].dataValues.count)
            }
            sum = sum/cou
            timeresp.push(sum)
            //timeresp.push(srTimeAns[0].dataValues.avg)
        }

        if (projects === undefined || projects[i] === undefined || projects.length === 0 || projects[i].length === 0) {
            countProj.push(0)
        }
        else {
            countProj.push(projects[i].dataValues.count)
        }
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
