const moment = require('moment');
const q = require('q');
const mailgun = require('mailgun-js')({
    apiKey: sails.config.mailgun.key,
    domain: sails.config.mailgun.domain
});

module.exports = {
    send(to, subject, content, template, variables) {
        var final_content;

        var from = variables.context.name + ' <no-reply@emkc.org>';

        subject = subject.replace('{{name}}', variables.context.name);

        var send = () => {
            mailgun.messages().send(
                {
                    from,
                    to: constant.email_intercept || to,
                    'h:Reply-to': variables.reply_to || 'no-reply@emkc.org',
                    subject,
                    html: final_content
                },
                (err, body) => {
                    try {
                        console.log('email to: ' + to);
                        console.log('subject: ' + subject);
                        console.log('err: ' + err);
                        console.log('body: ' + JSON.stringify(body));
                    } catch (e) {
                        console.log('in catch');
                    }
                }
            );
        };

        if (template) {
            views.render(template, variables).then((template_content) => {
                final_content = template_content;
                send();
            });
        } else {
            final_content = content;
            send();
        }
    }
};
