// Dependencies
import express from 'express';
import webpack from 'webpack';
import path from 'path';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import open from 'open';
import exphbs from 'express-handlebars';

// Config
import config from '../config';

// Webpack Configuration
import webpackConfig from '../../webpack.config.babel';

// API
import blogAPI from './api/blog';
import libraryAPI from './api/library';

// Helpers
import * as hbsHelper from '../lib/handlebars';

// Utils
import { isMobile } from '../lib/utils/device';

// Environment
const isDevelopment = process.env.NODE_ENV !== 'production';

// Express app
const app = express();

// Public
app.use(express.static(path.join(__dirname,'../public')));

// Handlebars Setup
app.engine(config.views.engine, exphbs({
  extname: config.views.extension,
  helpers: hbsHelper
}));

// View Engine Setup
app.set('views', path.join(__dirname, config.views.path));
app.set('view engine', '.hbs');

// Webpack Compiler
const webpackCompiler = webpack(webpackConfig);

if (isDevelopment) {
  // Webpack Middleware
  app.use(webpackDevMiddleware(webpackCompiler));
  app.use(webpackHotMiddleware(webpackCompiler));
}

// Device Detector
app.use((req, res, next) => {
  res.locals.isMobile = isMobile(req.headers['user-agent']);
  return next();
});

// API dispatch
app.use('/api/blog', blogAPI);
app.use('/api/library', libraryAPI);

// Sending all traffic to React
app.get('*', (req, res) => {
  res.render('frontend/index', {
    layout: false
  });
});

// Listen Port
app.listen(config.serverPort, err => {
  if (!err) {
    open(`${config.baseUrl}`);
  }
});
