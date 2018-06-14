import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const morgan = require('morgan');
const session = require('express-session');

const MongoStore = require('connect-mongo')(session);
const passport = require('./passport');

import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import schema from './schema/schema';

// Route requires
const user = require('./routes/user');

// declaring the express app and the port to be used
const app = express();
const PORT = 5000;

// move this key to the config file later
const mongoURI = 'mongodb://localhost:27017/itigurus';

// Cors used for request from CLient App  in Local Development

app.use(cors());

// mongobd Connection and Setup

mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
  console.log('Connected to Database ');
});

// MIDDLEWARE
app.use(morgan('dev'));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Sessions
app.use(
  session({
    secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false, //required
    saveUninitialized: false //required
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session()); // calls the deserializeUser

// Routes
app.use('/user', user);

// graphql
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(req => {
    return {
      schema: schema,
      context: {
        userid: null
      }
      // other options here
    };
  })
);
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Starting the server on Port , usee the ENV.PORT varialble Later

app.listen(PORT, () => {
  console.log('Listening on Port 5000');
});
