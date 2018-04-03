'use strict'

const Env = use('Env')

const uuidv3 = require('uuid/v3');
const moment = require('moment');
const crypto = require('crypto');
const ENCRYPTION_KEY = Env.get('DOMAIN_ENCRYPTION_KEY');
const IV_LENGTH = 16; // For AES, this is always 16

class DomainController {
    async createdomaintoken({ response, request }) {
        const { domain } = request.params;
        const dm_object = {
            date: moment().valueOf(),
            domain,
            uuid: uuidv3(domain, uuidv3.DNS)
        }
        const tk = Buffer.from(JSON.stringify(dm_object), 'utf8').toString('hex');
        response.send(this.encrypt(tk));
    }
    async decodedomaintoken({ response, request }) {
        const { token } = request.params;
        const p = this.decrypt(token);
        const tk = Buffer.from(p, 'hex').toString('utf8');
        response.json(JSON.parse(tk));
    }
    encrypt(text) {
        let iv = crypto.randomBytes(IV_LENGTH);
        let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return iv.toString('hex') + ':' + encrypted.toString('hex');
    }

    decrypt(text) {
        let textParts = text.split(':');
        let iv = new Buffer(textParts.shift(), 'hex');
        let encryptedText = new Buffer(textParts.join(':'), 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
        let decrypted = decipher.update(encryptedText);

        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return decrypted.toString();
    }



}

module.exports = DomainController
