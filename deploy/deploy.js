"use strict";

const request = require('request');
const config = require('../config.json');

const deployTriggers = [
	/what(s|\'s| is) (on|deployed|deployed to) (copper|bronze)/i
];

export function checkDeploymentMessages(message, rtm) {

	if(deployTriggers.some((exp) => exp.test(message.text))) {
		let env = message.text.toUpperCase().indexOf('COPPER') > -1 ? 'copper' : 'bronze';
		rtm.sendMessage("I'm checkin' " + env + ", hold onto your tacos...", config.room, () => console.log('sent hang on checking'));
		getLastPackageDeploymentDate(env, (dateStr) => {
			let message = 'Packages on ' + env + ' were built on ' + dateStr;
			rtm.sendMessage(message, config.room, () => console.log('Sent deployment date'));
		});
	}
}

export function getLastPackageDeploymentDate(env, callBack) {
	console.log(JSON.stringify(config));
	console.log(env + 'BundlesUrl:', config[env + 'BundlesUrl']);
	request({
		url: config[env + 'BundlesUrl']
	}, (err, resp, body) => {
		var bodyObj = JSON.parse(body);

		var firstPackageName = Object.keys(bodyObj)[0];
		var firstTimeStamp = bodyObj[firstPackageName].split('?')[1].split('=')[1];
		var dateStr = new Date(+firstTimeStamp).toString();
		console.log(firstTimeStamp);
		console.log('calling back with',dateStr);
		callBack(dateStr);
	});
}

