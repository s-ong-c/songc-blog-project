// @flow
import GithubAPI from 'github';
import { google } from 'googleapis';
import FacebookAPI from 'fb';
import { plus_v1 } from 'googleapis/build/src/apis/plus/v1';

const profileGetters = {
    github(accessToken: string){
        const github = new GithubAPI();
        github.authenticate({
            type: 'token',
            token: accessToken,
        });
        return new Promise((resolve, reject) => {
            github.users.get({}, (err, res) => {
                if (err) reject(err);
                const {
                    id,
                    avatar_url: thumbnail,
                    email,
                } = res.data;
                const profile = {
                    id,
                    thumbnail,
                    email,
                };
                resolve(profile);
            });
        });
    },
    facebook(accessToken: string){
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
    google(accessToken: string){
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