var express = require('express');                               //Fetch express module to application
var path = require('path');                                     //Fetch path module to application
var app = express();                                            //Initialize app variable with express
const exphbs = require('express-handlebars');                   //Fetch express-handlebars module for application
const port = process.env.port || 3000;                          //Serve web app of env variable port if defined else on 3000

app.use(express.static(path.join(__dirname, 'public')));        //Configure web app to use application root path appended with public as the folder to serve static content
app.engine('.hbs', exphbs.engine({ extname: 'hbs' }))           //setiing the app engine with .hbs key and value as exphbs.engine({ extname: 'hbs' })           
app.set('view engine', 'hbs');                                  //Set app parameter view engine to hbs value
app.get('/', function (req, res) {                              //Set root route
    res.render('index', { title: 'Express' });                  //Redirect to index handlebar and pass title as express and inject the value of title in all relevant handlebars
});
app.get('/users', function (req, res) {                         //Set /users route
    res.send('respond with a resource');                        //Just pass text as response
});
app.get('*', function (req, res) {                              //Set route for undefined path
    res.render('error', { title: 'Error', message: 'Wrong Route' });        //Call the error handlebar and pass message attribute for handlebars
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)        //initialize the server
})