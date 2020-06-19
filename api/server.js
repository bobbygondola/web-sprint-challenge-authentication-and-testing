const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dbConnection = require('../database/dbConfig')

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

/////////////////////////////////////////////////////////session
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const sessionConfig = {
  name: "Monkey",
  secret: "secret",
  cookie: {
    maxAge: 1000 * 60 * 10 * 60,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: true,
  store: new KnexSessionStore({
    knex: dbConnection,
    createtable: true,
    clearInterval: 1000 * 60 * 60 * 24, // one day
  }),
};
server.use(session(sessionConfig))

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

//test localhost:3300/
server.get('/', (req,res) => {
    res.status(200).json({api: "is up, work hard every waking hour!"})
})

module.exports = server;
