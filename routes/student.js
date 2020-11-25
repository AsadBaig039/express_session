var express = require('express');
var router = express.Router();


// get Routes

router.get('/', function(req,res,next){
res.send("Dashboard");
});

module.exports = router;