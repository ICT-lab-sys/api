/**
 * Created by Swendley on 17-2-2017.
 */
var express = require('express')

var app = express();
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

var port = process.env.PORT || 3000;
var router = express.Router();

router.get('/', function (req, res) {
    MongoClient.connect('mongodb://localhost:27017/testdatabase', function (err, db) {
        if (err) throw err

        db.collection('usercollection').find().toArray(function (err, result) {
            if (err) throw err

            res.send(result)

        })
    })
})

app.use('/api', router);

app.listen(port, function () {
    console.log('Example app listening on port 3000!')
})