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

/* CLIENT ROUTES */
app.get('/api/generateID', spun.videoIDGenerator);
app.post('/api/buildVideo', spun.buildVideo);
app.get('/api/videoURL/:videoID', spun.sendVideoURL);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

/* SERVER TO SERVER ROUTES */
app.post('/video/:videoID', spun.saveVideoURL);

module.exports = app;