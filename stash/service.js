import config from '../config.json';

function loop() {
    setTimeout(() => {
        
        
        
        loop();
    }, config.pullRequestNotificationDelay);
}
