var express = require('express');
var app = express();
var compress = require('compression');

const PORT = process.env.PORT || 8081;

app.set('views', './static/views');
app.set('view engine', 'jade');

app.use(compress());
app.use(express.static('build'));
app.use(express.static('static'));

var title = "Malaysia Komuter KTM Timetable Schedule"
var helloMessage = "Komuter KTM Timetable and Schedule"

app.get('/', function(req, res){
  res.render('index', {title: title, message: helloMessage})
})

var server = app.listen(PORT, function(){
  console.log("App is running on port %s", PORT);
})
