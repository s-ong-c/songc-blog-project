// @flow
import GithubAPI from 'github';
import { google } from 'googleapis';
import FacebookAPI from 'fb';
import { plus_v1 } from 'googleapis/build/src/apis/plus/v1';

type Profile = {
    id: number | string,
    thumbnail: ?string,
    email: ?string,
    name: ?string,
};

const profileGetters = {
    github(accessToken: string): Promise<Profile>{
        const github = new GithubAPI();
        github.authenticate({
            type: 'token',
            token: accessToken,
        });
        return new Promise((resolve, reject) => {
            github.users.get({}, (err, res) => {
                if (err) {
                    reject(err);
                    return;
                  }
                  
                const {
                    id,
                    avatar_url: thumbnail,
                    email,
                    name,
                } = res.data;
                const profile = {
                    id,
                    thumbnail,
                    email,
                    name,
                };
                resolve(profile);
            });
        });
    },
    facebook(accessToken: string): Promise<Profile>{
        return FacebookAPI.api('me', { fields: ['name', 'email', 'picture'], access_token: accessToken })
        .then((auth) => {
            return {
              id: auth.id,
              name: auth.name,
              email: auth.email || null,
              thumbnail: auth.picture.data.url,
            };
          });
    },
    google(accessToken: string): Promise<Profile>{
        const plus = google.plus({
            version: 'v1',
          });
        return new Promise((resolve, reject) => {
            plus.people.get({
              userId: 'me',
              access_token: accessToken,
            }, (err, auth) => {
              if (err) {
                reject(err);
                return;
              }
              const {
                id,
                image,
                emails,
                displayName,
              } = auth.data;
      
              const profile = {
                id,
                thumbnail: image.url,
                email: emails[0].value,
                name: displayName && displayName.split(' (')[0],
              };

              resolve(profile);
            });
          });  
        }, 
}
export default function getSocialProfile(provider: string, accessToken: string) {
    return profileGetters[provider](accessToken);
    
};