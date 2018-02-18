import express from 'express';
import http from 'http';

let app = express();

let server = http.createServer(app);

import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

let port = process.env.PORT || 8080;

import mongooseConf from './config/mongoose.conf';

mongooseConf(mongoose);

app.use(morgan('dev'));

app.use(cookieParser());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/dist'));

let router = express.Router();

import routes from './app/routes';

routes(app, router);

server.listen(port);

console.log(`May the force be with you on port ${port}`);

export {app};

module.exports = server;