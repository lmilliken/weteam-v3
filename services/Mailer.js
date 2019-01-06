const config = require('../config/config');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.sendGridKey);

class Mailer {
  constructor(to, from, subject, content) {
    console.log('content inside Mailer: ', content);

    this.message = {
      to,
      from,
      subject,
      html: content
    };
  }

  async send() {
    const response = await sgMail.send(this.message);
    return response;
  }
}

module.exports = Mailer;
// const msg = {
//   to: 'test@example.com',
//   from: 'test@example.com',
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>'
// };
// sgMail.send(msg).then(console.log('message sent'));

// const sendgrid = require('sendgrid');
// const helper = sendgrid.mail;
// const config = require('../config/config');

// class Mailer extends helper.Mail {
//   constructor(to, from, subject, content) {
//     super(); //model it after the helper.Mail class

//     console.log('content inside Mailer: ', content);
//     this.sendGridAPI = sendgrid(config.sendGridKey);

//     this.recipients = to;
//     this.from_email = new helper.Email(from);
//     this.subject = subject;
//     this.body = new helper.Content('text/html', content);
//   }

//   async send() {
//     console.log('json: ', this);
//     const request = this.sendGridAPI.emptyRequest({
//       method: 'POST',
//       path: '/v3/mail/send',
//       body: this
//     });

//     const response = await this.sendGridAPI.API(request);
//     return response;
//   }
// }

// module.exports = Mailer;
