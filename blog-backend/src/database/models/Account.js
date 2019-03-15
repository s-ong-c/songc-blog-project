// @flow
import Sequelize from 'sequelize';
import db from '../db';

const Account = db.define('accounts',{
    id: { type: Sequelize.INTEGER, primaryKey: true,},
    balance:{ type: Sequelize.INTEGER}
});

Account.sync({force: true}).then(() =>  Account.bulkCreate([
            {id: 1, balance: 1000},
            {id: 2, balance: 250},
        ]));
