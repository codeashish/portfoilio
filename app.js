var express = require('express');
var app = express();

var nodeMailer = require('nodemailer');
const path = require('path');
var port = process.env.PORT || 8080;
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// app.engine('html', require('ejs').renderFile);

require('dotenv').config();
const hbs = require('hbs');



const publicpath = path.join(__dirname, '/public');
app.set('view engine', 'hbs');
const viewspath = path.join(__dirname, "/dynamic/views");
const partialspath = path.join(__dirname, '/dynamic/partials');
// app.set('views', viewspath);
app.use(express.static(publicpath)); //Static pages
hbs.registerPartials(partialspath);

console.log(process.env);

app.get('/', (req, res) => {
    res.render('index');

}).listen(port, () => {
    console.log("Server start at port 8080");
});


app.post('/send-email', function (req, res) {
    let transporter = nodeMailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.user,
            pass: process.env.pass
        }
    });
    let mailOptions = {
        from: '"Ashish Bhagwan"<ashishboss9977@gmail.com>', // sender address
        to: 'code.asg@protonmail.com', // list of receivers
        subject: "Hello", // Subject line
        text: "Heyyyyy", // plain text body
        html: '<b>NodeJS Email Tutorial</b>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.render('index');
    });
});