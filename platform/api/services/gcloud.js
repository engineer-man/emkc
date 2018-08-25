const constant = require('./constant');
const fs = require('fs');
const gcloud = require('gcloud');
const mime = require('mime-types');
const request = require('request');
const q = require('q');
const duplex = require('stream').Duplex;

var gcs = gcloud.storage({
    keyFilename: constant.is_prod()
        ? __dirname + '/../../config/gcloud/storage.json'
        : __dirname + '/../../config/gcloud/storage.json',
    projectId: 'tierlabs'
});

var engineerman = gcs.bucket(constant.gcloud);

module.exports = {

    upload(source, dest, secure) {
        var promise = q.defer();

        fs.createReadStream(source)
            .pipe(
                engineerman
                    .file(dest)
                    .createWriteStream({
                        resumable: false,
                        metadata: {
                            contentType: mime.lookup(source) || 'application/octet-stream',
                            cacheControl: 'private'
                        }
                    })
            )
            .on('finish', data => {
                if (!secure) {
                    engineerman
                        .file(dest)
                        .makePublic((err, data) => {
                            if (err) return promise.reject(err);
                            return promise.resolve();
                        });
                } else {
                    return promise.resolve();
                }
            })
            .on('error', err => {
                return promise.reject(err);
            });

        return promise.promise;
    },

    stream_upload(source, dest, secure, from_buf) {
        var promise = q.defer();

        if (from_buf) {
            var stream = new duplex();
            stream.push(source);
            stream.push(null);
            source = stream;
        }

        var file_type = mime.lookup(secure ? source.filename : dest);

        source
            .pipe(engineerman
                .file(dest)
                .createWriteStream({
                    resumable: false,
                    metadata: {
                        contentType: file_type || 'application/octet-stream',
                        cacheControl: 'private'
                    }
                })
            )
            .on('finish', data => {
                if (!secure) {
                    engineerman
                        .file(dest)
                        .makePublic((err, data) => {
                            if (err) return promise.reject(err);
                            return promise.resolve();
                        });
                } else {
                    return promise.resolve();
                }
            })
            .on('error', err => {
                return promise.reject(err);
            });

        return promise.promise;
    },

    retrieve(source) {
        var promise = q.defer();

        engineerman
            .file(source)
            .download((err, contents) => {
                if (err) return promise.reject(err);
                return promise.resolve(contents);
            });

        return promise.promise;
    },

    move(source, dest) {
        var promise = q.defer();

        engineerman
            .file(source)
            .move(dest, (err, data) => {
                if (err) return promise.reject(err);
                return promise.resolve();
            });

        return promise.promise;
    },

    delete(source) {
        var promise = q.defer();

        engineerman
            .file(source)
            .delete((err, data) => {
                if (err) return promise.reject(err);
                return promise.resolve();
            });

        return promise.promise;
    }

};
