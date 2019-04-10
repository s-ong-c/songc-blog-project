import {
    EmailAuth,
    SocialAccount,
    User,
    UserProfile,
} from './models';

export default function sync() {
    // sync Models
    User.sync();
    UserProfile.sync();
    SocialAccount.sync();
    EmailAuth.sync();

    // set relations configure
    UserProfile.associate();
    SocialAccount.associate();
}



