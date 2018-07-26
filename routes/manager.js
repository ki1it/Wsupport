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
    let current_tel = current_id["0"].dataValues.tel_number
    let projects = await sql_api.GetProjectsById(current_tel)
    let projectsNames = []
    let messget = []
    let messsend = []
    let timeresp = []
    let countAllMes = await sql_api.GetMessForManager(current_tel)
    let countAllMesLs = await sql_api.GetMessForManagerLs(current_tel)
    let chartmess = await sql_api.GetMessForPersonForWeek(current_tel)
    chartmess.reverse()
    chartmess = '['+chartmess.toString()+']'
    for (let i = 0; i<projects.length;i++)
    {
       projectsNames.push(await sql_api.GetProjectName(projects[i].dataValues.chat_id))
        messget.push(await sql_api.GetCountGetForProject(current_tel,projects[i].dataValues.chat_id))
        messsend.push(await sql_api.GetCountSendForProject(current_tel,projects[i].dataValues.chat_id))
        time = await  sql_api.GetRespTimeForProject(current_tel,projects[i].dataValues.chat_id)
        if(time.length == 0)
            timeresp.push(0)
        else
            timeresp.push(time["0"].dataValues.avg)

    }
    res.render('manager', {
        chartmess:chartmess,
        //timeAnsProjects: timeAnsProjects,
        //ansProjects: ansProjects,
        //quesProjects: quesProjects,
        curManager: req.query.id,
        //srTime: srTime,
        //countAns: countAns,
        projects: projects,
        countAllMes: countAllMes,
        countAllMesLs: countAllMesLs,
        months: months,
        projectNames: projectsNames,
        messget: messget,
        messsend: messsend,
        timeresp: timeresp,
    });
});




module.exports = router;