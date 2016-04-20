var RtmClient = require('slack-client/lib/clients/rtm/client');
var RTM_EVENTS = require('slack-client/lib/clients/events/rtm').EVENTS;
var RTM_CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS.RTM;
var request = require('request');

var token = process.env.SLACK_API_TOKEN || 'xoxb-36292465760-eqsuT9u9J467RjSb1qsRbZdj';

var rtm = new RtmClient(token, { logLevel: 'debug' });
rtm.start();

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
  console.log('Message:', message);
});

rtm.on(RTM_EVENTS.REACTION_ADDED, function handleRtmReactionAdded(reaction) {
  console.log('Reaction added:', reaction);
});

rtm.on(RTM_EVENTS.REACTION_REMOVED, function handleRtmReactionRemoved(reaction) {
  console.log('Reaction removed:', reaction);
});


// you need to wait for the client to fully connect before you can send messages
rtm.on(RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED, function () {
  // This will send the message 'this is a test message' to the channel identified by id 'C0CHZA86Q'
  // rtm.sendMessage('So when is lunch?', 'C03KL4SUN', function messageSent() {
  //   // optionally, you can supply a callback to execute once the message has been sent
  //   console.log('message sent');
  // });


  // get pull requests
  request("http://stash.paylocity.com/rest/api/1.0/projects/TAL/repos/recruiting/pull-requests", function(error, response, body) {
    if (error) {
      console.log('error');
      console.log(error);
    }

    if (response) {
      console.log('response');
      console.log(response);
    }

    if (body) {
      console.log('body');
      console.log(body);
    }

  });
});
