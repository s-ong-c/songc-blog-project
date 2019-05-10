// @flow
import Sequelize from 'sequelize';
import db from 'database/db';
import { Post, Tag } from 'database/models';
import { primaryUUID } from 'lib/common';

/* N:M Relationship between Posts and Tags */
const PostsTags = db.define('posts_tags', {
  id: primaryUUID,
  fk_post_id: Sequelize.UUID,
  fk_tag_id: Sequelize.UUID,
});

PostsTags.associate = function associate() {
  Post.belongsToMany(Tag, {
    onDelete: 'restrict',
    onUpdate: 'restrict',
    through: {
      model: PostsTags,
    },
    foreignKey: 'fk_post_id',
  });
  Tag.belongsToMany(Post, {
    onDelete: 'restrict',
    onUpdate: 'restrict',
    through: {
      model: PostsTags,
    },
    foreignKey: 'fk_tag_id',
  });
};

export default PostsTags;