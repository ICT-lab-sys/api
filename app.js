var express = require('express')

var app = express();
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient
var moment = require('moment');
var data;
var c
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

var port = process.env.PORT || 3000;
var router = express.Router();
var timer = setInterval(checkIfDataUpdated, 5000);

router.get('/', function (req, res) {
    res.send("Please go to localhost:3000/api/temp")

})
    router.get('/temp', function (req, res, next) {
        MongoClient.connect('mongodb://localhost:27017/ictlab', function (err, db) {
            if (err)  { return next(err); }

            db.collection('temp').find().toArray(function (err, result) {
                if (err) throw err

                if (JSON.stringify(c)==JSON.stringify(result)){
                    console.log("statement klopt")
                     next(res.status(500).send(result))
                    if(res.statusCode = 500){
                        console.log("server down")
                    }
                    return;
                }

                data = result
               return res.send(result)
            })

        })
    });



    app.use('/api', router);


    app.listen(port, function () {
        console.log('Example app listening on port '+port+'!')
    })

    function checkIfDataUpdated() {
            c = data
    }

