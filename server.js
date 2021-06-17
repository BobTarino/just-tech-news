const path = require('path');
const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// middleware for parsing incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// middleware function that can take all of the contents of public folder and serve them as static assets
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);


// turn on connection to db and server
// "sync" connects models to associated db tables // { force: true } is SQL equivalent to DROP TABLE IF EXISTS
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});