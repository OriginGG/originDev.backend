'use strict'

const Env = use('Env')

const dns = require('dns');
const uuidv3 = require('uuid/v3');
const moment = require('moment');
const crypto = require('crypto');

class DomainController {
    async accessSite({ response, request }) {
        const hostname = request.hostname()
        console.log(hostname);
        const record = await this.getRecord(hostname);
        console.log({ txt: record });
        response.redirect('http://origin.gg?domain=disrupt');
    }
    async getDomainTXTRecord({ response, request }) {
        const q = request.all(); 
        const { host } = q;
        const record = await this.getRecord(host);
        response.json({ txt: record });
    };
    async createdomaintoken({ response, request }) {
        const q = request.all();
        const { host } = q;
        const md5sum = crypto.createHash('md5');
        md5sum.update(uuidv3(host, uuidv3.DNS));
        const token = md5sum.digest('hex');
        response.send({ token });
    }
    async getRecord(host) {
        return new Promise((resolve, reject) => {
            dns.resolveTxt(host, (err, add) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(add);
                }
            });
        });
    }


}

module.exports = DomainController
