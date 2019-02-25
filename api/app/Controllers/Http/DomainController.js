'use strict'

const Env = use('Env')

const dns = require('dns');
const uuidv3 = require('uuid/v3');
const moment = require('moment');
const crypto = require('crypto');
const Database = use('Database');
const _ = require('lodash');

class DomainController {
    async getdomaintokens({ response, request }) {
        const domains = await Database.select('*').from('domain_registration')
        response.header('Content-Range', `domains 0-${domains.length}/${domains.length}`);
        response.send(domains)
    }

    async getdomaintokensingle({ params, response, request }) {
        const q = params;
        const domain = await Database.from('domain_registration').where('id', q.id)
        response.send(domain[0])
    }


    async createdomaintokensingle({ params, response, request }) {
        const p = request.all();
        const { host } = p;
        const md5sum = crypto.createHash('md5');
        md5sum.update(uuidv3(host, uuidv3.DNS));
        const token = md5sum.digest('hex');
        try {
            const domain_id = await Database
                .table('domain_registration')
                .insert({ host, token })
                .returning('*')
            response.send(domain_id[0]);
        } catch (error) {
            response.send({ error: 'Domain probably already exists!', actual_error: error });
        }
    }
    async updatedomaintokensingle({ params, response, request }) {
        const p = request.all();
        const q = params;
        try {
            const affectedRows = await Database
                .table('domain_registration')
                .where('id', q.id)
                .update(p)
                .returning('*')
            response.send(affectedRows[0]);
        } catch (error) {
            response.send({ error: 'Domain could not be updated!', actual_error: error });
        }
    }

    async deletedomaintokensingle({ params, response, request }) {
        const q = params;
        try {
            const affectedRows = await Database
                .table('domain_registration')
                .where('id', q.id)
                .returning('*')
            response.send(affectedRows[0]);
        } catch (error) {
            response.send({ error: 'Domain could not be deleted!', actual_error: error });
        }
    }
    async accessSite({ response, request }) {
        const hostname = request.hostname()
        console.log(hostname);
        const record = await this.getRecord(hostname);
        console.log({ txt: record });
        response.redirect('52.86.203.150');
    }
    async getDomainTXTRecord({ response, request }) {
        const q = request.all(); 
        const { host } = q;
        const record = await this.getRecord(host);
        
        if (record && record.length > 0) {
            let fnd = false;
            for (let a in record) {
                const el = _.find(record[a], (o) => {
                    return (o.indexOf('origin-token') > -1) || (o.indexOf('origin_token') > -1);
                })  
                if (el) {
                    fnd = true;
                    const token = el.substring(13, el.length);
                    const domain = await Database.from('organisation_account').where('domain_uuid_token', token)
                    if (domain && domain.length > 0) {
                        const theme = await Database.from('themes').where('theme_name', domain[0].sub_domain)
                        response.json({ success: true, theme: theme[0], domain: domain[0] });
                    } else {
                        response.json({ success: false, theme: {}, domain: {} });
                    }
                }
            }
            if (!fnd) {
                response.json({ success: false, theme: {}, domain: {} });
            }
        } else {
            response.json({ token: null });
        }
       
    };
    async createdomaintoken({ response, request }) {
        const q = request.all();
        const { host } = q;
        if (host) {
            const md5sum = crypto.createHash('md5');
            md5sum.update(uuidv3(host, uuidv3.DNS));
            const token = md5sum.digest('hex');
            try {
                const domain_id = await Database
                    .table('domain_registration')
                    .insert({ host, token })
                response.send({ id: domain_id, token });
            } catch (error) {
                response.send({ error: 'Domain probably already exists!', actual_error: error });
            }
        } else {
            response.send({error: 'Host not supplied!'})
        }    
    }
    
    async getRecord(host) {
        return new Promise((resolve, reject) => {
            try {
                dns.resolveTxt(host, (err, add) => {
                    if (err) {
                        resolve(null);
                    } else {
                        resolve(add);
                    }
                });
            } catch (error) {
                reject(err);
            }  
        });
    }


}

module.exports = DomainController
