var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./routes');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Add middleware body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Share public folder
app.use(express.static(path.join(__dirname, 'public'))); 

// Routes
app.get('/', routes.index);
app.get('/list', routes.list);
app.post('/save', routes.save);
app.delete('/movie/:id', routes.delete);
app.put('/movie', routes.update);

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    console.log('Server started on port ' + server.address().port);
});