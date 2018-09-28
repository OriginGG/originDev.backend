'use strict';
const Env = use('Env');
const cloudinary = require('cloudinary');
const Database = use('Database');
const Helpers = use('Helpers');
const fs = require('fs');
const removeFile = Helpers.promisify(fs.unlink);
const path = require('path');

class CloudinaryController {
    async upload({ response, request }) {
        try {
            const p = request.all();
            if (p.sub_domain === undefined || p.theme === undefined) {
                response.badRequest({
                    error: 'missing theme or sub_domain parameter!'
                });
            } else {
                this.configure();
                const filePics = request.file('images', {
                    types: ['image'],
                    size: '50mb'
                });
                const fName = path.join(
                    Helpers.tmpPath('uploads'),
                    filePics.clientName
                );
                await removeFile(fName);
                await filePics.move(Helpers.tmpPath('uploads'));
                if (!filePics.moved()) {
                    return filePics.errors();
                }
                const p_id =
                    p.force_name !== undefined
                        ? `${p.sub_domain}_${p.theme}_${p.force_name}`
                        : `${p.sub_domain}_${p.theme}_${filePics.fileName}`;
               
                const res = await cloudinary.v2.uploader.upload(fName, {
                    public_id: p_id,
                    overwrite: true
                });
                await removeFile(fName);
                response.json(res);
            }
        } catch (error) {
            response.badRequest(error);
        }
    }
    configure() {
        cloudinary.config({
            cloud_name: Env.get('CLOUDINARY_API_NAME'),
            api_key: Env.get('CLOUDINARY_API_KEY'),
            api_secret: Env.get('CLOUDINARY_API_SECRET')
        });
    }
}

module.exports = CloudinaryController;
