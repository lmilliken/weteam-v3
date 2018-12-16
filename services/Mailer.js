const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const config = require('../config/config');

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super(); //model it after the helper.Mail class

    this.sendGridAPI = sendgrid(config.sendGridKey);

    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body); //addContent is provided is helper.Mail to create the content of email

    this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach((recipient) => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  async send() {
    const request = this.sendGridAPI.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });

    const response = await this.sendGridAPI.API(request);
    return response;
  }
}

module.exports = Mailer;
