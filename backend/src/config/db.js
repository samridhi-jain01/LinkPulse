import { Sequelize } from 'sequelize'
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_name || 'linkpulsedb',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASS || 'postgres',
    {
        host: process.env.DB_HOST || 'localhost',
        port:5432,
        dialect:'postgres',
        logging:false,
    }
);

 

