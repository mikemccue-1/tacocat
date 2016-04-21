import config from '../config.json';
import Stash from './stash.js';

const stashClient = new Stash({
  root: config.stashRoot,
  projectName: config.stashProject,
  repo: config.stashRepo
});

let lastError = null;
let lastResponse = {};

function loop() {
    
    stashClient.getPullRequests((err, resp) => {
        lastError = err;
        lastResponse = resp;
    });
    
    setTimeout(() => {
        loop();
    }, config.stashPollDelay);
}

loop();

export function getPullRequests(callBack) {
    callBack(lastError, lastResponse);
}
