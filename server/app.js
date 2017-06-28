import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import logger from 'morgan';
import spun from './spunGenerator';

const app = express();

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'shhhhhhhhh', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../public')));

/* CLIENT ROUTES */
app.get('/api/generateID', spun.videoIDGenerator);
app.get('/api/videoURL/:videoID', spun.sendVideoURL);
app.post('/api/buildVideo', spun.buildVideo);

/* SERVER TO SERVER ROUTES */
app.post('/video/:videoID', spun.saveVideoURL);


/* CATCH ALL ROUTES */

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


module.exports = app;