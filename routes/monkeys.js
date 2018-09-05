var express = require('express');
var router = express.Router();
var sql_api = require('../db_seq/sql_seq_api');
var moment = require('moment');
var $ = require("jquery");

var date1 = moment().subtract(7,'days')
var date2 = moment()
var allPeriod = false

function setAllPeriod(state){
    allPeriod = state
}

function setDate1(date){
    date1 = date
}
function setDate2(date){

    date2 = date
}
/* GET statis page. */
router.get('/', async function (req, res, next) {

    if(allPeriod===false) {
        inputtext = date1.format('DD.MM.YYYY') + '-' + date2.format('DD.MM.YYYY')
    }else{
        inputtext = ''
    }

    let list = await sql_api.GetMonkeys()
    let mess = []
    for(let i=0; i<list.length; i++)
    {
        let res = await sql_api.GetMonkeysMessById(list[i].dataValues.chat_id, date1,date2)

            mess.push(res)
    }


    res.render('monkeys', {
        zagolovok: 'Статистика по людям',
        list:list,
        mess:mess,
        inputtext: inputtext,
        // srTimeAns: srTimeAns,
        // messagesGroup: messagesGroup,
        // messagesLs: messagesLs,


    })


});

module.exports = router;
module.exports.setDate1 = setDate1
module.exports.setDate2 = setDate2
module.exports.setAllPeriod = setAllPeriod
