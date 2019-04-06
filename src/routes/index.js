var express = require('express');
var router = express.Router();
var User = require("../models/user");
var mongoose = require("mongoose");


router.get("/",(req,res)=>{
    User.find({}).then(data=>{
        res.send(data);
    }).catch(data=>{
        res.status(400).send(data);
    });
});

router.post("/",(req,res)=>{
    var users = req.body;
    mongoose.startSession().then(session=>{
        //console.log(session);
        session.startTransaction();
        console.log("Started transation.");
        User.deleteMany({},{session:session}).then(data=>{
            //session.abortTransaction();
            User.insertMany(users,{session:session}).then(data=>{
                //session.abortTransaction();
                session.commitTransaction();
                console.log("Committing...");
                res.send(data);
            }).catch(data=>{
                console.log("Aborting...");
                session.abortTransaction();
                res.status(400).send(data);
            });
        }).catch(data=>{
            res.status(400).send(data);
        });
    });
    
});

module.exports = router;