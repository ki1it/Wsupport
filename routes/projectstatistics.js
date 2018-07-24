var express = require('express');
var router = express.Router();

/* GET statis page. */
router.get('', function(req, res, next) {
        var proj = req.query.proj;
        var srTimeAns = [15, 10];
        var managers = ['loh', 'pidr'];
        var countAns = [1, 1];
        var countMan = 2;
        res.render('projectstatistics', {
            zagolovok: 'Статистика по ' + proj,
            countMan: countMan,
            countAns: countAns,
            srTimeAns: srTimeAns,
            managers: managers
        });
});

module.exports = router;
