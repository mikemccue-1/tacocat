"use strict";

/*

            THIS IS A HEAVY WORK IN PROGRESS, SUPREME DUDES

*/

const request = require('request');
const config = require('./config.json');

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

        var opts = {
            url: this.root + this.api + this.projectName + '/repos/' + this.repo + '/pull-requests',
            auth: {
                user: config.user,
                password: config.password
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


var stashClient = new Stash({
    root: config.stashRoot,
    projectName: config.stashProject,
    repo: config.stashRepo
});

stashClient.getPullRequests((err, resp) => {
    if (response === undefined) {
        console.log('Stash returned undefined');
        return;
    }
    if(err) {
        console.log('Stash returned an error', err);
    }
    for (var i = 0; i < response.values.length; i++) {
        var pr = response.values[i];
        // if (pr.fromRef.displayId.indexOf(ticket) > -1 && pr.open === true) {
        if(pr.open === true) {
            console.log('Found matching pull request ', pr.fromRef.displayId);
            console.log('Link to pull request', pr.links.self[0].href);
        }
    }
});