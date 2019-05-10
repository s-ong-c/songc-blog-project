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