'use strict'

const Mail = use('Mail')
const Env = use('Env')


class MailController {
    async signup({ response, request }) {
        const data = request.only(['email', 'name', 'password', 'admin_user', 'token', 'dev'])
        if (data.admin_user === true || data.admin_user === 'true') {
            // let url = `http://localhost:3000/new_signup?token=${data.token}`;
            // if (!data.dev) {
            const url = `http://origin.gg/new_signup?token=${data.token}&admin=true`;
            // }
            await Mail.send('emails.signup', { organization_url: url, name: data.name }, (message) => {
                message
                    .to(data.email)
                    .from('admin@origin.gg')
                    .subject('Welcome to OriginGG')
            })
        } else {
            const url = `http://origin.gg/new_signup_ind?&p=${v.password}&id=${data.id}&admin=false`;
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
