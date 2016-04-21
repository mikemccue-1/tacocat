import Stash from './stash/stash.js';
import config from './config.json';
import * as messages from './messages.js';
import {
  checkFoodMessages
}
from './food.js';
import {
  humorMessages
}
from './humor.js';

const stashClient = new Stash({
  root: config.stashRoot,
  projectName: config.stashProject,
  repo: config.stashRepo
});

var RtmClient = require('slack-client/lib/clients/rtm/client');
var RTM_EVENTS = require('slack-client/lib/clients/events/rtm').EVENTS;
var RTM_CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS.RTM;
var request = require('request');

var token = process.env.SLACK_API_TOKEN || config.slackToken;

var rtm = new RtmClient(token, {
  logLevel: 'debug'
});
rtm.start();

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
  console.log('Message:', message);
  checkFoodMessages(message, rtm);
  humorMessages(message, rtm);
  console.log('Checking for the any prs notification');
  if(/any prs/i.test(message)) {
    console.log('Found any prs notification');
    checkPullRequests(); // DO IT NAOW!
  }
});

rtm.on(RTM_EVENTS.REACTION_ADDED, function handleRtmReactionAdded(reaction) {
  console.log('Reaction added:', reaction);
});

rtm.on(RTM_EVENTS.REACTION_REMOVED, function handleRtmReactionRemoved(reaction) {
  console.log('Reaction removed:', reaction);
});

function sendTeamMessage(message) {
  rtm.sendMessage(message, 'C03KL4SUN', () => console.log('Sent', message));
  console.log('Sending', message);
}

function stashReminderLoop() {
  setTimeout(() => {
    checkPullRequests();
    stashReminderLoop();
  }, config.pullRequestNotificationDelay || 90000);
}

function checkPullRequests() {
    try {
      stashClient.getPullRequests((err, resp) => {
        console.log('Got response for checkPullRequests');
        if (resp === undefined) {
          sendTeamMessage("Stash has lost it. I asked it for pull requests, it said 'undefined'.");
          return;
        }
        if (err) {
          sendTeamMessage("Guys ... is Stash down or something? I asked it for pull requests, it gave me an error!", err);
        }
        const openPullRequests = resp.values.filter((pr) => pr.open);

        if (openPullRequests.length > 0) {
          var message = messages.pr_messages(openPullRequests, rtm);
        }
      });
    }
    catch (e) {
      console.log('An error happened with checkPullRequests');
      sendTeamMessage("Stash must be having a bad day. I asked it for pull requests. It said", e.message);
    }
}

// you need to wait for the client to fully connect before you can send messages
rtm.on(RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED, function() {
  // This will send the message 'this is a test message' to the channel identified by id 'C0CHZA86Q'
  // rtm.sendMessage('So when is lunch?', 'C03KL4SUN', function messageSent() {
  //   // optionally, you can supply a callback to execute once the message has been sent
  //   console.log('message sent');
  // });

  stashReminderLoop();
  // get pull requests
});
// request("http://stash.paylocity.com/rest/api/1.0/projects/TAL/repos/recruiting/pull-requests", function(error, response, body) {
// if (error) {
//   console.log('error');
//   console.log(error);
// }

// if (response) {
//   console.log('response');
//   console.log(response);
// }

// if (body) {
//   console.log('body');
//   console.log(body);
// }

// });
// });
