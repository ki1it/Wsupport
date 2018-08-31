var express = require('express');
var sql_api = require('../db_seq/sql_seq_api')
var router = express.Router();




/* GET home page. */
router.get('/', async function(req, res, next) {

    let projects =  await sql_api.GetProjects()
    let projects_hidden =  await sql_api.GetProjectsHideen()
  res.render('index', {
      projects : projects,
      projects_hidden: projects_hidden
  });


});

module.exports = router;
