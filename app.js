var express = require('express');                               //Fetch express module to application
var path = require('path');                                     //Fetch path module to application
var app = express();                                            //Initialize app variable with express

const fs = require('fs');
app.use(express.static(path.join(__dirname, 'public')));        //Configure web app to use application root path appended with public as the folder to serve static content


const exphbs = require('express-handlebars');                   //Fetch express-handlebars module for application
const { all } = require('../Assignment1/routes');


const port = process.env.port || 3000;                          //Serve web app of env variable port if defined else on 3000


var myData = fs.readFileSync('dataset.json');
var allBooks = JSON.parse(myData);

// Initialize built-in middleware for urlencoding and json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('.hbs', exphbs.engine({ extname: 'hbs' }))           //setiing the app engine with .hbs key and value as exphbs.engine({ extname: 'hbs' })           
app.set('view engine', 'hbs');                                  //Set app parameter view engine to hbs value




app.get('/', function (req, res) {                              //Set root route
    res.render('index', { title: 'Express' });                  //Redirect to index handlebar and pass title as express and inject the value of title in all relevant handlebars
});

// This path will match to /allData
app.get('/data', (req, res) => {
    console.dir(allBooks, {'maxArrayLength': null})
    res.render('confirmDataLoaded', {message:"JSON data is loaded and ready"});

})


//Get book ISBN details by ISBN index
app.get('/data/isbn/:index', (req, res) => {
    let queryIndex = req.params.index;
    if(queryIndex>=0 && queryIndex<allBooks.length){
        //console.log(allBooks[queryIndex]);
        var result = [];
        result.push(allBooks[queryIndex])
        res.render('listOfBooks', {books:result});
        
        //res.status(200).send(allBooks[queryIndex].ISBN);
    }
    res.render('confirmDataLoaded', {message:"Out of bounds index...Dont play with me"});
    
    
})


//Get book details by Title
app.route('/data/search/title')
.get(function(req,res)  {
    res.render('searchByTitle');
})
.post(function(req,res){
    let queryTitle = req.body.title;
    console.log(queryTitle);
    var booksWithTitle =  JSON.parse('{"foundBooks":[]}');
    var found = 0;
    if(queryTitle!=""){
        allBooks.forEach(element => {
            if(element.title.toLowerCase().includes(queryTitle.toLowerCase())){
                booksWithTitle['foundBooks'].push(element);
                found++;
            }
        });
    }
    else{
        res.render('confirmDataLoaded',{message: "Looks like you are lost in space and ocean of nothingness"});
    }
    if (found != 0)
    {
        res.render('listOfBooks',{books:booksWithTitle.foundBooks});
    }
    res.render('confirmDataLoaded',{message: "Tried hard! BUT not found"});
})

// This path will match to /allData
app.get('/allData', (req, res) => {
    res.render('listOfBooks', {books:allBooks});

})

app.get('/users', function (req, res) {                         //Set /users route
    res.send('respond with a resource');                        //Just pass text as response
});
app.get('*', function (req, res) {                              //Set route for undefined path
    res.render('error', { title: 'Error', message: 'Wrong Route' });        //Call the error handlebar and pass message attribute for handlebars
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)        //initialize the server
})