var express = require('express');
var sql_api = require('../db_seq/sql_seq_api')
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {

    let projects =  await sql_api.GetProjects()
        // .then(res =>{
        //         countProject = res.rowCount
        //
        // })
        // .catch(e =>
        //     console.error(e.stack))
        // кол
    let countProject = undefined
    let namesProject = []
    let chatIDs = []

  res.render('index', { projects : projects});


});

module.exports = router;
