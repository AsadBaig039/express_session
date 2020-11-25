var express = require('express');
var router = express.Router();
var Teacher = require('../models/teacher');
var Student = require('../models/student');
var Class = require('../models/class');

// get Routes

router.get('/', function(req,res,next){
res.send("Dashboard");
});

router.get('/classes', function(req,res,next){
    res.send("List of classes");
    });


router.get('/classes/:id', function(req,res,next){
    Class.find({ _id:req.params.id}).populate('teacher').populate('students.sid').exec(function(error,results){
        if(error){
            return next(error);
        }
        //Respond with valid data
        res.json(results);
    });
    });  

router.get('/teachers', function(req,res,next){
    Teacher.find().sort('name').exec(function(error,results){
        if(error){
            return next(error);
        }
        res.json(results);

    });
    });    

router.get('/teachers/:id', function(req,res,next){
    Teacher.findById(req.params.id).then((teacher)=>{
        res.statusCode = 200;
        res.setHeader('content-Type','application/json');
        res.json(teacher);
    },(err)=>{
        next(err).catch((err)=>next(err))
    }
    );
    }); 

router.get('/students', function(req,res,next){
    Student.find().sort('name').exec(function(error,results){
        if(error){
            return next(error);
        }
        res.json(results);

    });
    });   


router.get('/students/:id', function(req,res,next){
    Student.findById(req.params.id).then((student)=>{
        res.statusCode = 200;
        res.setHeader('content-Type','application/json');
        res.json(student);
    },(err)=>{
        next(err).catch((err)=>next(err))
    }
    );
    });     

// post Routes

router.post('/addclass', function(req,res,next){
    res.send("class is added ");
    });   


router.post('/addteacher', function(req,res,next){
    console.log(req.body.name);
    console.log(req.body.designation);
    Teacher.create(req.body).then((teacher)=>{
        console.log("teacher added successfully", teacher);
        res.statusCode = 200;
        res.setHeader('content-Type','application/json');
        res.json(teacher);
    },(err)=>{
        next(err).catch((err)=>next(err))
    }
    );
    });   
    
router.post('/addstudent', function(req,res,next){
    console.log(req.body.name);
    console.log(req.body.registrationNo);
    Student.create(req.body).then((student)=>{
        console.log("student added successfully", student);
        res.statusCode = 200;
        res.setHeader('content-Type','application/json');
        res.json(student);
    },(err)=>{
        next(err).catch((err)=>next(err))
    }
    );
    });   

// put routes

router.put('/class/:id', function(req,res,next){
    res.send("class is updated");
    }); 

router.put('/editteacher/:id', function(req,res,next){
Teacher.findOneAndUpdate({_id: req.params.id},function(error,results){
    if(error){
        return next(error);
    }
    res.json(results);
});
    }); 
// Delete routes

router.delete('/delteacher/:id', function(req,res,next){
    Teacher.deleteOne({_id: req.params.id},function(error,results){
        if(error){
            return next(error);
        }
        res.json(results);
    });
    }); 


router.delete('/delstudent/:id', function(req,res,next){
    Student.deleteOne({_id: req.params.id},function(error,results){
        if(error){
            return next(error);
        }
        res.json(results);
    });
    });     

module.exports = router;