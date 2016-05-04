'use strict';
// "buildfailureurl": "http://tc1.qa.paylocity.com/httpauth/app/rest/builds/?locator=status:failure,count:100,project:ats",
//   "builddetailsurl": "http://tc1.qa.paylocity.com/httpauth/app/rest/builds/id:",

const request = require('request');
const buildsSeen = [];

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const config = require('../config.json');

export function getNewFailedBuilds(callBack) {
  const url = config.buildFailureUrl + config.teamcityProject; //"http://tc1.qa.paylocity.com/httpAuth/app/rest/builds/?locator=status:failure,count:100,project:ATS";
  var opts = {
    url: url,
    auth: {
      user: config.teamcityUser,
      password: config.teamcityPassword
    },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };
  console.log(JSON.stringify(opts));

  request(opts, function (error, response, body) {
    const failedBuilds = [];
    let builds = JSON.parse(body);
    let buildsFound = 0;
    console.log(body);

    builds.build.forEach((build) => {
      if (!buildsSeen.some((bid) => bid === build.id)) {
        buildsSeen.push(build.id);
        failedBuilds.push(build);
        buildsFound++;
      }
    });

    console.log('Found', buildsFound, 'new builds');
    if (buildsSeen.length > 200) {
      buildsSeen.slice(0, buildsSeen.length - 200);
    }
    
    callBack(failedBuilds);

  });

}

export function getBuildDetail(bid, callBack) {
  const url = config.buildDetailsUrl + bid;
  var opts = {
    url: url,
    auth: {
      user: config.teamcityUser,
      password: config.teamcityPassword
    },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };

  request(opts, function (error, response, body) {
    let build = JSON.parse(body);
    callBack(build);
  });
}

getBuildDetail(2275899, function(build) {
  console.log(build);
});

// export default class Stash {
//   constructor(args) {
//     this.root = args.root;
//     this.api = 'rest/api/1.0/projects/';
//     this.projectName = args.projectName;
//     this.repo = args.repo;
//
//     if (this.root.substring(this.root.length - 1) !== '/') {
//       this.root.substring += '/';
//     }
//   }
//
//   getPullRequests(callBack) {
//     const url = this.root + this.api + this.projectName + '/repos/' + this.repo + '/pull-requests';
//     console.log('getPullRequests', url);
//     var opts = {
//       url: url,
//       auth: {
//         user: config.stashUser,
//         password: config.stashPassword
//       }
//     };
//     request(opts, function(error, response, body) {
//       console.log('stash returned', body);
//       console.log('stash error?', error);
//       var pullRequests;
//       if (body !== undefined) {
//         pullRequests = JSON.parse(body);
//       }
//       callBack(error, pullRequests);
//     });
//   }
// }
//
//

