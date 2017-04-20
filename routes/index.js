var express = require('express');
var router = express.Router();
var github = require('octonode');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Report an issue or provide feedback' });
});
var client = github.client(process.env.GIT_KEY);
var ghrepo = client.repo(process.env.REPO);
router.post('/', function(req, res) {
    ghrepo.issue({
        "title": req.body.title,
        "body": req.body.body,
        "assignee": "devisscher"
    }, function(err, issue) {
        if (err) {
            console.log(err);
        } else {
            console.log(issue);
            res.send("Thank you"); //issue
        }
    });
});
router.get('/issues', function(req, res, next) {

    ghrepo.issues(function(err, issues) {
        if (err) {
            res.send(err);
        } else {
            console.log(issues)
            res.render('issues', { title: 'Report an issue or provide feedback', issues: issues });
        }

    });

});

module.exports = router;