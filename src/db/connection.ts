import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('ecommerce', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;