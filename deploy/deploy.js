"use strict";

const request = require('request');
const config = require('../config.json');

const deployTriggers = [
	/what(s|\'s| is) (on|deployed|deployed to) (copper|bronze|prod|demo|corp|tin|pewter)/i
];
const whatEnvironments = [
	/what environments/i
];
const environments = [
	"prododd", "prodeven", "corpodd", "corpeven", "demoodd", "demoeven", "tin", "pewter", "copper", "bronze"
];

export function checkDeploymentMessages(message, rtm) {
	if(whatEnvironments.some((exp) => exp.test(message.text))) {
	  rtm.sendMessage("I know " + environments.join(', '),
			  config.room,
			  () => console.log('sent what rooms I know'));
	}
	if(deployTriggers.some((exp) => exp.test(message.text))) {
		let env = environments.find((eName) => {
		  if(message.text.toUpperCase().indexOf(eName.toUpperCase()) > -1) {
		    return eName;
		  } else {
		    return false;
		  }
		});
		if(env === undefined) {
			rtm.sendMessage("What kind of environment is that?", config.room,
					() => console.log('could not find environment'));
			return;
		}

		rtm.sendMessage("I'm checkin', hold onto your tacos...", config.room, () => console.log('sent hang on checking'));
		getLastPackageDeploymentDate(env, (dateStr) => {
			if(dateStr === "unknown") {
			  rtm.sendMessage("Uhh, I looked but I got a non-sensical response.", config.room,
					  console.log('Sent unknown response from bundles url'));
			} else {
			  let message = 'Packages on ' + env + ' were built on ' + dateStr;
			  rtm.sendMessage(message, config.room, () => console.log('Sent deployment date'));
			}
		});
	}
}

export function getLastPackageDeploymentDate(env, callBack) {
	console.log(JSON.stringify(config));
	console.log(env + 'BundlesUrl:', config[env + 'BundlesUrl']);
	request({
		url: config[env + 'BundlesUrl']
	}, (err, resp, body) => {
		try {
		  var bodyObj = JSON.parse(body);

		  var firstPackageName = Object.keys(bodyObj)[0];
		  var firstTimeStamp = bodyObj[firstPackageName].split('?')[1].split('=')[1];
		  var dateStr = new Date(+firstTimeStamp).toString();
		  console.log(firstTimeStamp);
		  console.log('calling back with',dateStr);
		  callBack(dateStr);
		} catch(e) {
		  callBack("unknown");
		}
	});
}

