'use strict'

const Env = use('Env')
const axios = require('axios');
const Database = use('Database');
const Hash = use('Hash');

class UserController {
    async loginUser({ response, request, auth }) {
        const p = request.post();
        const user = await Database.from('users').where({ email: p.email } )
        const { password_hash } = user[0];
        if (user && user.length > 0) {
            const isSame = await Hash.verify(p.password, password_hash)
            // we are same.
            if (isSame) {
                const tkn = await auth.generate(user[0])
                response.json({success: true, jwt: tkn})
            } else {
                response.json({ success: false });
            }

        } else {
            response.json({ success: false });
        }

        
    }
    async graphqlRequest({ response, request, auth }) {
        try {
            await auth.check();
            const p = request.post();
            const bd = {
                "query": p.data.query,
                "variables": p.data.variables
            }
            const td = await axios.post('https://graphql.originapi.com/graphql',
                bd
            );
            response.json(td.data.data);
        } catch(err) {
            response.json({ success: false, error: err.code });
        }
    };
}

module.exports = UserController
