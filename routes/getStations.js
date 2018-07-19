var express = require('express');
var router = express.Router();
var myPythonScriptPath = 'getStations.py';

// Use python shell
var PythonShell = require('python-shell');
// var pyshell = new PythonShell(myPythonScriptPath);
// var options = {
//     mode: 'text',
//     pythonPath: '/usr/bin/python3',
//     pythonOptions: ['-u'], // get print results in real-time
//     scriptPath: 'getStations.py',
//     args: [req.params.title]
//   };
/* GET users listing. */
router.get('/:title', function(req, res, next) {
    // Comment out this line:
    PythonShell.run(myPythonScriptPath, options= {
        mode: 'text',
        pythonPath: "python3",
        pythonOptions: ['-u'], // get print results in real-time
        args: [req.params.title]
    },
    function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        res.send(results)
    });

});

module.exports = router;