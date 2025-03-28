process.env.NODE_ENV = 'test';
process.env.PORT = '3001';

const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

describe('Database Connection', () => {
    afterAll(async () => {
        await sequelize.close();
    });

    it('should connect to database', async () => {
        await expect(sequelize.authenticate()).resolves.not.toThrow();
    });
});

module.exports = sequelize;