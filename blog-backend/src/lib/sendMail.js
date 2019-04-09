// @flow
import AWS from 'aws-sdk';

const ses = new AWS.SES({region: 'us-east-1'});

type EmailParams = {
    to: string,
    subject: string,
    body: string,
    from: string
}
const sendMail = ({
    to,
    subject,
    body,
    from,
}: EmailParams): Promise<*>=> {
    return new Promise((resolve, reject) => {
        const params = {
            Destination: {
                ToAddresses: ['somony9292@gmail.com']
              },
              Message: {
                Body: {
                  Html: {
                    Charset: 'UTF-8',
                    Data:
                      'This message body contains HTML formatting, like <a class="ulink" href="http://docs.aws.amazon.com/ses/latest/DeveloperGuide" target="_blank">Amazon SES Developer Guide</a>.'
                  },
                  Text: {
                    Charset: 'UTF-8',
                    Data: 'This is the message body in text format.'
                  }
                },
                Subject: {
                  Charset: 'UTF-8',
                  Data: subject,
                
                }
              },
              Source: 'SONGC <verification@songc.io>',
        };
        ses.sendMail(params, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        })
    });
};