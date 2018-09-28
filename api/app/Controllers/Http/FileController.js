'use strict'

const path = require('path');
const Helpers = use('Helpers')
const fs = require('fs');
const removeFile = Helpers.promisify(fs.unlink)
const AWS = require('aws-sdk');


class FileController {
    async upload({ response, request }) {
        debugger;
        const filePics = request.file('images', {
            types: ['image'],
            size: '50mb'
        })
        const { folder } = request.params;
        const fName = path.join(
            Helpers.tmpPath('uploads'),
            filePics.clientName
        );
        await removeFile(fName);

        await filePics.move(Helpers.tmpPath('uploads'));
        if (!filePics.moved()) {
            return filePics.errors()
        }
        const data = await this.readFile(fName);
        // upload to s3 here..
        await removeFile(fName);
        const s3_data = await this.send_to_s3(filePics.clientName, folder, data); 
        response.json(s3_data)
    }
    readFile(fileName) {
        return new Promise((resolve, reject) => {
            fs.readFile(fileName, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(new Buffer(data, 'binary'));
            });
        });
    }
    send_to_s3(fileName, folder, data) {
        return new Promise((resolve, reject) => {
            AWS.config.update({
                accessKeyId: 'AKIAJKM5XO7RKHRALMCQ',
                secretAccessKey: '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'
            });
            const s3 = new AWS.S3();
            s3.upload({
                Bucket: 'origin-images',
                Key: `${folder}/` + fileName,
                Body: data,
                ACL: 'public-read'
            }, (err, resp) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(resp)
                }
            })
        });

    }

}

module.exports = FileController
