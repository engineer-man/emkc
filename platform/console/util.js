#!/usr/bin/env node
require('./common');

const moment = require('moment');
const request = require('request-promise');

var cron = {

    ingest_chats() {
        var messages = require('fs')
            .read_file_sync('chats.log')
            .to_string()
            .split('\n')
            .map(msg => {
                const pieces = msg.split('|');

                const [ timestamp, channel, user ] = pieces;
                const message = pieces.slice(3).join('');

                return {
                    timestamp,
                    channel,
                    user,
                    message
                };
            });

        request
            ({
                method: 'post',
                url: 'http://127.0.0.1:2727/api/internal/chats',
                headers: {
                    authorization: sails.config.api.internal_key
                },
                body: messages,
                json: true,
                simple: true
            });
    }

};

var method = process.argv[2]
    .replace(/-/gi, '_')
    .replace(/^_+/gi, '');

cron[method]();
