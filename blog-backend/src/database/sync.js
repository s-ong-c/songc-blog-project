import {
    EmailAuth,
    SocialAccount,
    User,
    UserProfile,
    Post,
    Category,
    PostsCategories,
    Tag,
    PostsTags,
} from './models';

export default function sync() {
  // configure relations
  UserProfile.associate();
  SocialAccount.associate();
  Post.associate();
  Category.associate();
  PostsTags.associate();
  
  //sync 조건 설정
  /**
   *$ export SYNC_DB=true
   * or
   *$ export SYNC_DB=false
  */
  if (process.env.SYNC_DB !== 'true') {
    return;
  }
  // sync Models
  User.sync();
  UserProfile.sync();
  SocialAccount.sync();
  EmailAuth.sync();
  Post.sync();
  Category.sync();
  PostsCategories.sync();
  Tag.sync();
  PostsTags.sync();
}