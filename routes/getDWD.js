var express = require('express');
var router = express.Router();
var myPythonScriptPath = 'getDWD.py';

// Use python shell
var PythonShell = require('python-shell');
var pyshell = new PythonShell(myPythonScriptPath);

/* GET users listing. */
router.get('/:id/:phenomenon', function(req, res, next) {
    // Comment out this line:
    PythonShell.run(myPythonScriptPath, options= {
        mode: 'text',
        args: [req.params.id,req.params.phenomenon]
    }, 
    function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        res.send(results)
    });

});

module.exports = router;