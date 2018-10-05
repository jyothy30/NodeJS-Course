const express = require('express');
const hbs = require('hbs');

var app = express();
const fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs');



app.use((req, res, next) =>
{
    var log = `${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log, (err) =>
{
    if(err)
    console.log('error occured: ' , err);
})
next();
});

//no next so the application stops here.
// app.use((req,res,next) => {
//     res.render('maintainance.hbs');
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

// app.get('/', (req, res) => {
// //res.send('<h1>Hello  Express</h1>');
// res.send({
//     name: 'Jyothi',
//     likes: [
//         'Biking',
//         'Hiking'
//     ]
// })
// });

app.get('/', (req, res) =>
{
 res.render('home.hbs', {
    welcomeMessage: 'welcome',
    pageTitle: 'Hello there',
 })
})

app.get('/about', (req, res)=>
{
res.render('about.hbs', {
    pageTitle: 'About Page',
});
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
})

app.listen(3000, () =>{console.log('server is up on port 3000')});