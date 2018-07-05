'use strict'

const Mail = use('Mail')
const Env = use('Env')


class MailController {
    async invite_ind({ response, request }) {
        const data = request.only(['host', 'email', 'organisation'])
        let host = 'http://origin.gg';
        if (data.host) {
            host = data.host;
        } 
        const payload = Buffer.from(JSON.stringify(data), 'utf8').toString('hex');
        const url = `${host}/ind_invite?ipl=${payload}`;
        await Mail.send('emails.ind_invite', { organization_url: url, organisation: data.organisation, email: data.email }, (message) => {
            message
                .to(data.email)
                .from('admin@origin.gg')
                .subject(`Invite to ${data.organisation}`)
        })
        response.json({ success: true });
    }
    async signup({ response, request }) {
        const data = request.only(['id','host', 'email', 'name', 'password', 'admin_user', 'token', 'dev'])
        let host = 'http://origin.gg';
        if (data.host) {
            host = data.host;
        } 
        if (data.admin_user === true || data.admin_user === 'true') {
            
            const payload = Buffer.from(JSON.stringify(data), 'utf8').toString('hex');
            // let url = `http://localhost:3000/new_signup?token=${data.token}`;
            // if (!data.dev) {
            const url = `${host}/new_signup?p=${payload}&admin=true`;
            // }
            await Mail.send('emails.signup', { organization_url: url, name: data.name }, (message) => {
                message
                    .to(data.email)
                    .from('admin@origin.gg')
                    .subject('Welcome to OriginGG')
            })
        } else {
            const payload = Buffer.from(JSON.stringify(data), 'utf8').toString('hex');
            const url = `${host}/new_signup_ind?&p=${payload}&admin=false`;
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
