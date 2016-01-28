var express = require('express');
var bodyParser = require('body-parser');
var stripe = require('stripe')('your_key');

var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname));


app.post('/charge', function(req, res) {
    var amount = 1000;
    var elem = req.body.stripeToken; 
    stripe.charges.create({
        card: elem,
        currency: 'eur',
        amount: amount
    },
    function(err, charge) {
        if (err) {
            res.sendStatus(500, err);
        } else {
            res.sendStatus(204);
        }
    });
});

app.listen(process.env.PORT || 3000);
console.log('waiting on port 3000');
