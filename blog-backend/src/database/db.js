// @flow
import SequelizeCockroach from 'sequelize-cockroachdb';
import type Sequelize from 'sequelize';

const db:Sequelize = new SequelizeCockroach('blog','song','song',{
    dialect: 'postgres',
    port: 26257,
    logging: true,
});

export default db;
