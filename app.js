/**
 * Created by Soukwinder on 17-2-2017.
 */
var express = require('express')

var app = express();
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient
var moment = require('moment');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

var port = process.env.PORT || 3000;
var router = express.Router();

// var min = 12;
// var max = 30;
// var temp;
// var currentTime;
// var moment;
//
// var randomData = setInterval(createData, 3000);
//
// function createData(){
//     temp = Math.floor(Math.random() * (max - min + 1)) + min;
//     currentTime = new Date()
//     //moment =  moment().format('MMMM Do YYYY, h:mm:ss a');
//
// }
//
// function createdData() {
//     return '{"DateTime":'+currentTime+', "Temperature":'+temp+'}'
// }
//
// function random() {
//     console.log(createdData())
//     return createdData()
// }


router.get('/', function (req, res) {
    res.send("Please go to localhost:3000/api/temp")

})


    router.get('/temp', function (req, res) {
        MongoClient.connect('mongodb://localhost:27017/testdatabase', function (err, db) {
            if (err) throw err

            db.collection('usercollection').find().toArray(function (err, result) {
                if (err) throw err

                res.send(result)

            })
        })
    });


    app.use('/api', router);


    app.listen(port, function () {
        console.log('Example app listening on port '+port+'!')
    })

