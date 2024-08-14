const dotenv = require('dotenv');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const winston = require('winston');

dotenv.config();

const app = express();
const PORT = 3000;
const HOST = 'localhost';
const API_URL = process.env.API_URL;

// Logger setup with custom format
const customFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp(),
  winston.format.printf(({ timestamp, level, message, ...args }) => {
    const lvl = level.padEnd(7); // Adjust padding as per log levels
    return `${timestamp} [${lvl}]: ${message} ${
      Object.keys(args).length ? JSON.stringify(args, null, 2) : ''
    }`;
  })
);

// Create a Winston logger
const logger = winston.createLogger({
  level: 'debug',
  format: customFormat,
  transports: [
    new winston.transports.Console(), // Log to console for development
    // Additional transports like file can be added here
  ],
});

app.get('/status', (req, res, next) => {
  res.send('This is a proxy service');
});

const proxyOptions = {
  target: API_URL,
  changeOrigin: true,
  logger: logger,
  //   pathRewrite: {
  //     [`^/api/posts`]: '/',
  //   },
};

const proxy = createProxyMiddleware(proxyOptions);

// Middleware to log the incoming POST requests
app.use((req, res, next) => {
  if (req.method === 'POST') {
    logger.info('--- Received POST request ---');
    logger.info(`URL: ${req.url}`);
    logger.info(`Headers: ${JSON.stringify(req.headers, null, 2)}`);
    logger.info(`Body: ${JSON.stringify(req.body, null, 2)}`);
  }
  next();
});

app.use('/', proxy);

app.listen(PORT, HOST, () => {
  console.log(`Proxy Started at ${HOST}:${PORT}`);
});
