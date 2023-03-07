import { sequelize } from './sequelize.js';
import { defineModels } from '../models/defineModels.js';
import { logger } from '../services/logger.js';

(async () => {
  try {
    logger.info(`Trying to connect to database...`);
    await sequelize.authenticate();
  } catch (err) {
    logger.error(`Unable to connect to the database: ${err.message}`);
    process.exit(1);
  }
  logger.info(`The connection to database is established`);

  const { User, Group } = defineModels(sequelize);

  await sequelize.sync({ force: true });

  try {
    const createdUser = await User.create({
      login: 'John',
      password: 'Doe',
      age: 35,
      isDeleted: false,
    });
    const createdGroup = await Group.create({
      name: 'General',
      permissions: ['READ', 'SHARE', 'UPLOAD_FILES'],
    });
    await createdUser.addGroup(createdGroup);
    logger.info(`User added: ${JSON.stringify(createdUser.toJSON())}`);
    logger.info(`Group added: ${JSON.stringify(createdGroup.toJSON())}`);
    process.exit(0);
  } catch (err) {
    logger.error(`Unable to create user: ${err.message}`);
    process.exit(1);
  }
})();
