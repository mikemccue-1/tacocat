'use strict';

const request = require('request');
const buildsSeen = [];

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const config = require('../config.json');

export function getNewFailedBuilds(callBack) {
  try {
  const url = config.buildFailureUrl + config.teamcityProject; 
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
  } catch(e) {
    console.log('Error retrieving teamcity status', e.message);
    callBack([]);
  }

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

