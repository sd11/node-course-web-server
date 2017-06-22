const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log('Unable to append to server.log.')
        }
    });
    next();
});
//If you dont want any routes to render
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public')); //use is to register a middlewhere

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('uppercase', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello</h1>');
    // res.send({
    //     name: 'ABC',
    //     likes: [
    //         'Biking',
    //         'Cities'
    //     ]
    // });
    res.render('home.hbs', {
        pageTitle: 'ABC',
        welcomeMsg: 'Welcome to ABC'
    })
});

app.get('/about', (req, res) => {
    //res.send('About');
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({ errormessage: 'Unable to handle request'});
});

app.listen(3000, () => {
    console.log('Server is up on 3000');
});
