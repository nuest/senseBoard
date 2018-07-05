var express = require('express');
var router = express.Router();
var myPythonScriptPath = 'python.py';

// Use python shell
var PythonShell = require('python-shell');
var pyshell = new PythonShell(myPythonScriptPath);

/* GET users listing. */
router.get('/:id', function(req, res, next) {
    // Comment out this line:

    PythonShell.run(myPythonScriptPath, options= {
        mode: 'text',
        args: [req.params.id]
    }, 
    function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        res.send(results)
    });

  // And insert something like this instead:
//   res.json([{
//     id: 1,
//     username: "samsepi0l"
// }, {
//     id: 2,
//     username: "D0loresH4ze"
// }]);




});

module.exports = router;