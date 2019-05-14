// @flow
import Sequelize from 'sequelize';
import db from 'database/db';
import { primaryUUID } from 'lib/common';

export type TagModel = {
  id: string,
  name: string
};

const Tag = db.define('tag', {
  id: primaryUUID,
  name: Sequelize.STRING,
});

// gets 태그 아이디 if exists, create one if !exists.
Tag.getId = async function getId(name: string){
  try {
    let tag = await Tag.findOne({ where: { name } });
    if (!tag) {
      tag = await Tag.build({ name }).save();
    }
    return tag.id;
  } catch (e) {
    throw (e);
  }
}

export default Tag;