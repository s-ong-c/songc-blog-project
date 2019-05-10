// @flow
import Sequelize, { type Model } from 'sequelize';
import db from 'database/db';
import Category from './Category';
import PostsCategories from './PostsCategories';

export type PostAttributes = {
    id: string,
    title: string,
    body: string,
    type: 'markdown' | 'wysiwyg',
    is_temp: boolean,
}
const Post = db.define('post',{
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
    },
    title: Sequelize.STRING,
    body: Sequelize.STRING,
    is_markdown: Sequelize.BOOLEAN,
    is_temp: Sequelize.BOOLEAN,
    fk_user_id: Sequelize.UUID,
});

Post.associate = function associate(){
    Post.belongsToMany(Category, {
        onDelete: 'restrict',
        onUpdate: 'restrict',
        through: {
            model: PostsCategories,
          },
          foreignKey: 'fk_post_id',
    });
};
export default Post;
