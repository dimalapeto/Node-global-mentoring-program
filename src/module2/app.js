import express from 'express';
import { sequelize } from './services/sequelize.js';
import routes from './routers/routes.js';

(async () => {
  try {
    console.log(`Trying to connect to database...`);
    await sequelize.authenticate();
  } catch (err) {
    console.error(`An error when tried to connect to DB: ${err.message}`);
    process.exit(1);
  }
  console.log(`The connection to database is established`);

  const app = express();
  const port = 3000;

  app.use(express.json());

  app.use('/', routes);

  try {
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (err) {
    console.error(`An error occured: ${err.message}`);
    process.exit(1);
  }
})();
