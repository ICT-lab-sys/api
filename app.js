var express = require('express')
var app = express();
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'sysictlab@gmail.com',
        pass: 'SoukYousSwen'
    }
});
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient
var moment = require('moment');
var data;
var c;
var countedInterval;
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());
var lastUpdatedData;
var port = process.env.PORT || 3000;
var router = express.Router();
var timer = setInterval(checkIfDataUpdated, 5000);

router.get('/', function (req, res) {
    res.send("Please go to localhost:3000/api/temp")

})



router.get('/temp', function (req, res, next) {
    MongoClient.connect('mongodb://localhost:27017/ictlab', function (err, db) {
        if (err) {
            return next(err); //ewa
        }

        db.collection('temp').find().toArray(function (err, result) {
            if (err) throw err


            if (JSON.stringify(c) == JSON.stringify(result)) {
                countedInterval++;
                console.log(countedInterval)

                //                  Dit is voor Intermittent failure
                if (countedInterval == 3) {
                    next(res.status(500).send(result))
                    if (res.statusCode = 500) {
                        console.log("Intermittent failure")

                        transporter.sendMail({
                            from: 'sysictlab@gmail.com',
                            to: 'sysictlab@gmail.com',
                            subject: 'Intermittent failure',
                            html: '<b>Intermittent failure</b>',
                            text: 'Intermittent failure'
                        });
                    }
                    return;
                }
                //                  Dit is voor Server Down
                if (countedInterval == 30) {
                    next(res.status(500).send(result));
                    if (res.statusCode = 500) {
                        console.log("Sensor is down")

                        transporter.sendMail({
                            from: 'sysictlab@gmail.com',
                            to: 'sysictlab@gmail.com',
                            subject: 'Sensor down',
                            html: '<b>Sensor is down</b>',
                            text: 'Sensor is down'
                        });
                    }
                    return;
                }
                next(res.status(304).send(result));
                return;
            }


            if (JSON.stringify(c) != JSON.stringify(result) && res.statusCode == 200) {
                countedInterval = 0;
                console.log(countedInterval);
                data = result
                return res.send(result)
            }
        })
    })
});


app.use('/api', router);


app.listen(port, function () {
    console.log('Example app listening on port ' + port + '!')
})

function checkIfDataUpdated() {
    c = data
}
