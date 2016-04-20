require('babel/register');
var http = require('http');
const config = require('./config.json');

try {
  var token = config.slackToken; // get token from config.json
} catch (error) {
  console.log("Your slack token should be in the config.json, one is not set");
  return;
}

var Bot = require('./bot');
var bot = new Bot(token);
bot.login();

// Heroku requires the process to bind to this port within 60 seconds or it is killed 
http.createServer(function(req, res) {
  res.end('TACOCAT');
}).listen(process.env.PORT || 5000)


//mm - the old connect shtuff
// server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
//   var addr = server.address();
//   console.log("Chat server listening at", addr.address + ":" + addr.port);
// });

