var express = require('express');
var router = express.Router();
var moment = require('moment');
var sql_api = require('../db_seq/sql_seq_api');
var $ = require("jquery");
// var srTime = stuff.srTime // среднее время ответа
// var countAns = 'нихуя';   // всего ответов
// var countAllMes = 500 // всего сообщений
// var countProjects = 1;    // кол
// var namesProjects = ['косяк'];
// var quesProjects = ['чо?'];
// var ansProjects = ['не знаю'];
// var timeAnsProjects = ['долго'];
var months = '[0,0,0,0, 0, 0, 0, 0, 0, 0, 0, 0]';
var date1 = moment()
var date2 = moment()
/* GET manager page. */
async function setDate1(date){
    date1 = date
}
async function setDate2(date){

    date2 = date
}
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
    let cou = date2.diff(date1,'days')
    let chartmess = await sql_api.GetMessForPersonForTime(current_tel, date1, date2, cou)
    //let chartmess  = [1,2,3,4,5,6,7,5,6,4,4,44,6,3,3,5,5,6,3]
    let days = []
    let datetemp = date1
    for (let i=0;i<=cou;i++)
    {
        days.push('\''+datetemp.format("MMM Do YY").toString()+'\'')
        datetemp.add("days",1)
    }
    days = '['+days.toString()+']'
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
        days:days,
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

router.post('/filter', function (req, res) {
    console.log(req.body.dates + " is added to top of the list.");

});


module.exports = router;
module.exports.setDate1 = setDate1
module.exports.setDate2 = setDate2