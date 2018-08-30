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
var SortDay = false
var date1 = moment().subtract(7,'days')
var date2 = moment()
var allPeriod = false
var current_tel = undefined
function get_tel()
{
    return current_tel
}
/* GET manager page. */
function setAllPeriod(state){
    allPeriod = state
}
function setSortday(state){
    SortDay = state
}
function setDate1(date){
    date1 = date
}
function setDate2(date){

    date2 = date
}

function download(text) {
    window.open(encodeURI(text), "_blank")
}
router.get('', async function(req, res, next) {

    let current_id = await sql_api.GetPersonId(req.query.id)
    current_tel = current_id["0"].dataValues.tel_number
    let projects = await sql_api.GetProjectsById(current_tel)
    let projectsNames = []
    let messget = []
    let messsend = []
    let timeresp = []
    let inputtext = ''
    if(allPeriod===false) {
        inputtext = date1.format('DD.MM.YYYY') + '-' + date2.format('DD.MM.YYYY')
    }else{
        inputtext = ''
    }
    if(SortDay===true) {
        inputtext = date1.format('DD.MM.YYYY')
    }
    let countAllMes = await sql_api.GetMessForManager(current_tel, date1, date2)
    let countAllMesLs = await sql_api.GetMessForManagerLs(current_tel,date1, date2)
    let cou = date2.diff(date1,'days')
    let chartmess = undefined
    if(SortDay===true) {
        chartmess = await sql_api.GetMessForPersonForTimeHours(current_tel, date1)
    }else {
        if (allPeriod === true) {
            chartmess = await sql_api.GetMessForPersonForTimeDays(current_tel, moment().subtract(30, 'days'), moment(), 30)
        }
        else {
            chartmess = await sql_api.GetMessForPersonForTimeDays(current_tel, date1, date2, cou)
        }
    }
    //let chartmess  = [1,2,3,4,5,6,7,5,6,4,4,44,6,3,3,5,5,6,3]
    let days = []
    let datetemp = undefined
    if(SortDay===true) {
        datetemp = date1.clone()
        for (let i = 0; i <= 24; i++) {
            days.push('\'' + datetemp.format("LT").toString() + '\'')
            datetemp.add("h", 1)
        }
    }else {
        if (allPeriod === false) {
            datetemp = date1.clone()
            for (let i = 0; i <= cou; i++) {
                days.push('\'' + datetemp.format("MMM Do YY").toString() + '\'')
                datetemp.add("days", 1)
            }
        } else {
            datetemp = moment().subtract(30, 'days')
            for (let i = 0; i <= 30; i++) {
                days.push('\'' + datetemp.format("MMM Do YY").toString() + '\'')
                datetemp.add("days", 1)
            }
        }
    }
    days = '['+days.toString()+']'
    chartmess = '['+chartmess.toString()+']'
    for (let i = 0; i<projects.length;i++)
    {
       projectsNames.push(await sql_api.GetProjectName(projects[i].dataValues.chat_id))
        messget.push(await sql_api.GetCountGetForProject(current_tel,projects[i].dataValues.chat_id, date1, date2))
        messsend.push(await sql_api.GetCountSendForProject(current_tel,projects[i].dataValues.chat_id, date1, date2))
        time = await  sql_api.GetRespTimeForProject(current_tel,projects[i].dataValues.chat_id, date1, date2)
        if(time.length == 0)
            timeresp.push(0)
        else
            timeresp.push(time["0"].dataValues.avg)

    }


    res.render('manager', {
        inputtext:inputtext,
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
module.exports.get_tel = get_tel
module.exports.download = download
module.exports.setAllPeriod = setAllPeriod
module.exports.setSortday = setSortday