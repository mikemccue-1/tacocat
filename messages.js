function sendTeamMessage(message, rtm) {
  rtm.sendMessage(message, 'C03KL4SUN', () => console.log('Sent', message));
  console.log('Sending', message);
}

export function pr_messages(pr_array, rtm) {
    
    var links = pr_array.map((pr) => pr.links.self[0].href).join('\n');
    
    var possibles = [
        "Hey homeos, we got " + pr_array.length + " PULL REQUESTS be open! It's like a litter box in here!",
        "" + pr_array.length + " PR's outstanding",
        "Yo yo! " + pr_array.length + " PR's outstanding...",
        "I have HAD IT with these " + pr_array.length + " monkey fightin' PRs on this monday-to-friday repository!",
        "BANG! " + pr_array.length + " pull requests still open! -- Oh I'm sorry, did I break your concentration?"
    ];

    var which = getRandomInt(0, possibles.length - 1);

    sendTeamMessage(possibles[which], rtm);
    
    pr_array.forEach((pr) => {
       let approvals = pr.reviewers.filter((app) => app.approved).map((app) => app.user.name);
       let notYetApproved = pr.reviewers.filter((app) => !app.approved).map((app) => app.user.name);
       let link = pr.links.self[0].href;
       if(pr.reviewers.length === 0) {
           sendTeamMessage(getRandomElement(["What is the point of a pull request without approvers?",
           "Source control is not a toy. No approvers for this PR? Get back to work.",
           "Why ...? A PR with no reviewers? ...."]) + "\n" + link, rtm)  
       } else if(approvals.length > 0 && pr.reviewers.length > approvals.length) {
           sendTeamMessage("C'mon slackers, " + Array.join(approvals, ' and ') + " think this code is just fine. What's taking so long for this one?\n" + link, rtm);
       } else if(approvals.length === pr.reviewers.length) {
           sendTeamMessage(getRandomElement(["Seriously!? Everybody who is a reviewer on this PR thinks it's ace. Why isn't this merged?",
           "Everybody loves this PR! C'mon! Merge this!",
           "Survey says 100% of developers think this PR should be merged.",
           pr.reviewers.length + " out of " + pr.reviewers.length + " Supremes would merge this PR, but haven't yet..."]) + "\n" + link, rtm);
       } else if(approvals.length === 0) {
           sendTeamMessage(getRandomElement(["Has anyone actually LOOKED at this PR? Anybody?",
           "Crickets on this PR ...",
           "Are you all taking a nap? This PR has zero approvals. Napping is my job.",
           "Can this PR get some love? ...and can I get some cat nip?",
           "If approvals were tacos, this PR would have none."]) + '\n' + link, rtm);
       }
    });

}

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomElement(arr) {
    return arr[getRandomInt(0, arr.length - 1)];
}