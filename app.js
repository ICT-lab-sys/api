var express = require('express')

var app = express();
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient
var moment = require('moment');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

var port = process.env.PORT || 3000;
var router = express.Router();

router.get('/', function (req, res) {
    res.send("Please go to localhost:3000/api/temp")

})
    router.get('/temp', function (req, res) {
        MongoClient.connect('mongodb://localhost:27017/ictlab', function (err, db) {
            if (err) throw err

            db.collection('temp').find().toArray(function (err, result) {
                if (err) throw err

                res.send(result)

            })
        })
    });


    app.use('/api', router);


    app.listen(port, function () {
        console.log('Example app listening on port '+port+'!')
    })

