var express = require('express');
var router = express.Router();

var sql_api = require('../db_seq/sql_seq_api');

// var srTime = stuff.srTime // среднее время ответа
// var countAns = 'нихуя';   // всего ответов
// var countAllMes = 500 // всего сообщений
// var countProjects = 1;    // кол
// var namesProjects = ['косяк'];
// var quesProjects = ['чо?'];
// var ansProjects = ['не знаю'];
// var timeAnsProjects = ['долго'];
var months = '[0,0,0,0, 0, 0, 0, 0, 0, 0, 0, 0]';

/* GET manager page. */
router.get('', async function(req, res, next) {

    let current_id = await sql_api.GetPersonId(req.query.id)
    let current_tel = current_id.rows[0].tel_number
    let projects = await sql_api.GetProjectsById(current_tel)
    let projectsNames = []
    let messget = []
    let messsend = []
    let timeresp = []
    let countAllMes = await sql_api.GetMessForManager(current_tel)
    let countAllMesLs = await sql_api.GetMessForManagerLs(current_tel)
    for (let i = 0; i<projects.rowCount;i++)
    {
       projectsNames.push(await sql_api.GetProjectName(projects.rows[i].chat_id))
        messget.push(await sql_api.GetCountGetForProject(current_tel,projects.rows[i].chat_id))
        messsend.push(await sql_api.GetCountSendForProject(current_tel,projects.rows[i].chat_id))
        timeresp.push(await  sql_api.GetRespTimeForProject(current_tel,projects.rows[i].chat_id))
    }
    res.render('manager', {
        //timeAnsProjects: timeAnsProjects,
        //ansProjects: ansProjects,
        //quesProjects: quesProjects,
        curManager: req.query.id,
        //srTime: srTime,
        //countAns: countAns,
        countAllMes: countAllMes,
        countAllMesLs: countAllMesLs,
        //countProjects: countProjects,
        //namesProjects: namesProjects,
        months: months,
        projectNames: projectsNames,
        messget: messget,
        messsend: messsend,
        timeresp: timeresp,
        projectsCount: projects.rowCount
    });
});




module.exports = router;