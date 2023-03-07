import express from 'express';
import { sequelize } from './services/sequelize.js';
import routes from './routers/routes.js';
import { logger } from './services/logger.js';
import { HttpCode } from './constants.js';

(async () => {
  try {
    logger.info(`Trying to connect to database...`);
    await sequelize.authenticate();
  } catch (err) {
    logger.error(`An error when tried to connect to DB: ${err.message}`);
    process.exit(1);
  }
  logger.info(`The connection to database is established`);

  const app = express();
  const port = 3000;

  app.use(express.json());

  app.use((req, _res, next) => {
    logger.info(`Request: ${req.method} ${req.url}`);
    next();
  });

  app.use('/', routes);

  app.use((req, res) => {
    res.status(HttpCode.NOT_FOUND).send(`Not found`);
    logger.error(`Route not found: ${req.url}`);
  });

  app.use((err, _req, res, _next) => {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    logger.error(`Response code: ${res.statusCode}. Internal server error`);
    logger.error(err.stack);
  });

  app.use((err, req, res, _next) => {
    logger.error(`Request: ${req.method} ${req.url}. Message: ${err.message}`);
  });

  try {
    app.listen(port, () => {
      logger.info(`App listening on port ${port}`);
    });
  } catch (err) {
    logger.error(`An error occured: ${err.message}`);
    process.exit(1);
  }
})();
