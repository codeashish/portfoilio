var express = require('express');
var app = express();

var nodeMailer = require('nodemailer');
const path = require('path');
var Port = process.env.PORT || 8080;
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



app.get('/', (req, res) => {
    res.render('index.html');

}).listen(Port, () => {
    console.log("Server start at port 8080");
});





app.post('/contact', function (req, res) {




    const output = `  <p>A new request</p>
<h3>Conatct Details</h3>
<li>Name:${req.body.name}</li>
<li>Number:${req.body.number}</li>
<li>Text:${req.body.text}</li>
<li>Email:${req.body.email}</li>
`;



    let transporter = nodeMailer.createTransport({

        host: "smtp.gmail.com",
        secure: false,
        auth: {
            // type = 'login',

            type: 'OAuth2',
            user: process.env.user,
            pass: process.env.pass,
            clientId: process.env.clientid,
            clientSecret: process.env.clientsecret,
            refreshToken: process.env.refreshtoken,
            accessToken: process.env.accesstoken,

        }
    });
    let mailOptions = {
        from: '"Codeasg"<nodeashish@gmail.com>', // sender address
        to: 'code.asg@protonmail.com', // list of receivers
        subject: "Portfolio Request", // Subject line
        text: req.body.text, // plain text body
        html: output // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);

        res.redirect('contact.html');
    });
});