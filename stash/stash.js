"use strict";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const request = require('request');
const config = require('../config.json');

export default class Stash {
    constructor(args) {
        this.root = args.root;
        this.api = 'rest/api/1.0/projects/';
        this.projectName = args.projectName;
        this.repo = args.repo;

        if (this.root.substring(this.root.length - 1) !== '/') {
            this.root.substring += '/';
        }
    }

    getPullRequests(callBack) {
		const url = this.root + this.api + this.projectName + '/repos/' + this.repo + '/pull-requests';
		console.log('getPullRequests', url);
        var opts = {
            url: url,
            auth: {
                user: config.stashUser,
                password: config.stashPassword
            }
        };
        request(opts, function(error, response, body) {
            console.log('stash returned', body);
            console.log('stash error?', error);
            var pullRequests;
            if (body !== undefined) {
                pullRequests = JSON.parse(body);
            }
            callBack(error, pullRequests);
        });
    }
}




