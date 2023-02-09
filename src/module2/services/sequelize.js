import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const { DB_CONNECTION } = process.env;

export const sequelize = new Sequelize(DB_CONNECTION);
