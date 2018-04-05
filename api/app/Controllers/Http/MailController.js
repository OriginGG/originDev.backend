'use strict'

const Mail = use('Mail')
const Env = use('Env')


class MailController {
    async signup({ response, request }) {
        const data = request.only(['email', 'name', 'password', 'admin_user', 'token'])
        
        let url = `http://localhost:3000/new_signup?token=${data.token}`;
        if (Env.get('NODE_ENV').toLowerCase() === 'production') {
            url = `http://originapi.com/new_signup?token=${data.token}`;
        }
        await Mail.send('emails.signup', { organization_url: url, name: data.name }, (message) => {
            message
                .to(data.email)
                .from('admin@origin.gg')
                .subject('Welcome to OriginGG')
        })

        response.json({ success: true });
    }
}
module.exports = MailController
