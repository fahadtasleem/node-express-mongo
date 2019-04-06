var express    = require('express');        // call express
var app        = express();                 // define our app using express
//var bodyParser = require('body-parser');
var userR = require("./routes/index");
var mongoose = require("mongoose");
var config = require("./config/config");

app.use(express.json());


app.use('/users', userR);

mongoose.connect(config.db,(e)=>{
    if(e){
        console.log("Error connection to mongo");
    }else{
        console.log("Connected");
    }
});

app.listen(3050,()=>{
    console.log("server started.")
});
