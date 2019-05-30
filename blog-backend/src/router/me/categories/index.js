// @flow
import Router from 'koa-router';
import * as categoriesCtrl from './categories.ctrl';

const categories: Router = new Router();

categories.get('/',categoriesCtrl.listCategories);
categories.post('/', categoriesCtrl.createCategory);
categories.patch('/:id',categoriesCtrl.renameCategory);
export default categories;