// @flow
import SequelizeCockroach from 'sequelize-cockroachdb';
import type Sequelize from 'sequelize';
import pg from 'pg';

pg.defaults.parseInt8 = true; // fixes numbers returning as string
const { COCKROACHDB_HOST, COCKROACHDB_PW } = process.env;

const db:Sequelize = new SequelizeCockroach('song', 'song',COCKROACHDB_PW, {
  host: COCKROACHDB_HOST,
  dialect: 'postgres',
  port: 26257,
  logging: true,
  ssl: true,
  dialectOptions: {
    ssl: true,
  },
});

export default db;