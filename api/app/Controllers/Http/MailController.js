'use strict'

const Mail = use('Mail')
const Env = use('Env')


class MailController {
    async signup({ response, request }) {
        const data = request.only(['id' ,'email', 'name', 'password', 'admin_user', 'token', 'dev'])
        if (data.admin_user === true || data.admin_user === 'true') {
            const payload = Buffer.from(JSON.stringify(data), 'utf8').toString('hex');
            // let url = `http://localhost:3000/new_signup?token=${data.token}`;
            // if (!data.dev) {
            const url = `http://origin.gg/new_signup?p=${payload}&admin=true`;
            // }
            await Mail.send('emails.signup', { organization_url: url, name: data.name }, (message) => {
                message
                    .to(data.email)
                    .from('admin@origin.gg')
                    .subject('Welcome to OriginGG')
            })
        } else {
            const payload = Buffer.from(JSON.stringify(data), 'utf8').toString('hex');
            const url = `http://origin.gg/new_signup_ind?&p=${payload}&admin=false`;
            // }
            await Mail.send('emails.signup_individual', { organization_url: url, name: data.name }, (message) => {
                message
                    .to(data.email)
                    .from('admin@origin.gg')
                    .subject('Welcome to OriginGG')
            })
        }    

        response.json({ success: true });
    }
}
module.exports = MailController
