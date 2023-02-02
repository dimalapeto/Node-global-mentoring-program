import { sequelize } from './sequelize.js';
import { defineModels } from '../models/defineModels.js';

(async () => {
  try {
    console.log(`Trying to connect to database...`);
    await sequelize.authenticate();
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  }
  console.log('Connection has been established successfully.');

  const { User } = defineModels(sequelize);

  await sequelize.sync({ force: true });

  try {
    const createdUser = await User.create({
      login: 'John',
      password: 'Doe',
      age: 35,
      isDeleted: false,
    });
    console.log('User added:', createdUser.toJSON());
    process.exit(0);
  } catch (err) {
    console.error('Unable to create user:', err);
    process.exit(1);
  }
})();
