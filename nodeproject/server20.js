var express = require("express");
var app = express(); 

//install bodyparser
//so I can get req.body inside routes
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));


// Set up MySQL connection.
var mysql = require("mysql");

console.log('--------------the environment we are using----------------');
console.log(app.settings.env);
console.log('--------------the environment we are using----------------');

if (app.settings.env == 'development'){
  var connection = mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "Raphael@2014",
    database: "quiz_db"
  });
}else {
  var connection = mysql.createConnection(process.env.JAWSDB_URL);
}

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// serve static content for the app from the "public" directory in the application directory
app.use(express.static(process.cwd() + "/public"));

//make a route that renders a form to submit a food 
app.get('/quiz-questions', function(req,res){
  var query = "SELECT * FROM users ORDER BY score DESC"

  connection.query(query, function(err, result) {
    //res.json(result)
    res.render('quiz', {
      score : result
    });
  
  });
    
});  
 		// res.render('quiz', {
      
    // });
 

//make a route called submits with a method of post that res.json the req.body

  app.post('/submit', function(req,res){
  var counter = 0;
 
  if (req.body.question_one == "Both separable and linear") counter++;
  if (req.body.question_two == "Xdy – ydx = 0") counter++;
  if (req.body.question_three == "tickled") counter++;
  if (req.body.question_four == "their sweat turns red") counter++;
  if (req.body.question_five == "Nigeria") counter++;
  if (req.body.question_six == "Sharp White") counter++;
  if (req.body.question_seven == "no where") counter++;
  if (req.body.question_eight == "Beth") counter++;
  if (req.body.question_nine == "your name") counter++;
  if (req.body.question_ten == "three minutes") counter++;

  var query = "INSERT INTO users (name, score) VALUES (?, ?)";

  connection.query(query, [req.body.name, counter], function(err, result) {
   console.log(err)
  //  console.log('--sfsdjkjfsdfs=sdkfjdsaklfk')
   console.log(result)
    res.redirect('/quiz-questions');
  });
});
  var port = 3305;
  app.listen(port, function(){
    console.log('listening on port ' + port);
  });

