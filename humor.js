var rushTriggers = [
    /rush/i
];
var whiteCastleTriggers = [
    /(white castle|whitecastle)/i
];
var banjoMusic = [
    /(banjo|banjo music|folk music)/i
];

var tacocat = [
    /(tacocat|taco cat)/i
];

let rushMessages = [
    'Rush? Seriously? LAAAAAAME.',
    'Rush is not a real band, cause they are from Canada, which is not a real country.',
    "The Canadian government, which is not real, made up Rush to convince us all that Canada itself is real.  In other words it's not real music it's an advertisement",
    "Why listen to Rush when you can be jamming to some Slayer!",
    "If you like Rush, something is wrong with you."
];

let whiteCastleMessages = [
    "Oh man, I could seriously go for some white castle right now...",
    "You know, white castle makes their sliders with 100% real meat!",
    "Hey, McCue, let's go get some white castle - right now!"
];

let banjoMusicMessages = [
    "Banjo music ... isn't that the kind of stuff Barb listens to?",
    "Oh man, finally something worse than Rush"
];

let tacoCatMessages = [
    "I'm the best. My name is a palindrome. Do you even know what that means?",
    "I'm too busy supervising to do whatever you mere humans want.",
    "Don't bother me, I'm taking a nap.",
    "Say tacocat again! I dare you!",
    "Inconceivable.",
    "I'm on my 3rd run of machi koro today, on a winning streak..."
];

let triggerList = [
    { triggers: rushTriggers, messages: rushMessages },
    { triggers: whiteCastleTriggers, messages: whiteCastleMessages },
    { triggers: banjoMusic, messages: banjoMusicMessages },
    { triggers: tacocat, messages: tacoCatMessages }
];

function addTrigger(triggers, messages) {
    triggerList.push({triggers: triggers, messages: messages});
}

addTrigger([/(clowns|clown)/i], ["I hate clowns."]);
addTrigger([/(beer|booze|drinks|drink|drunk)]/i], ["Alright, that's it, I'll see you Supremes at the fox n' hound.", "It's 5 o'clock somewhere."]);
addTrigger([/game of thrones/i], ["My favorite character is Tyrian.", "I could watch that Lannister kid get slapped by Tyrian all day.", "You know nothing, Jon Snow!", "Winter is coming, beeotch."]);
addTrigger([/vegas/], ["Can't wait to get wasted in Vegas.", "Only thing that would make Vegas better? More booze.", "Hell yeah, Vegas!"]);
addTrigger([/(donald|donald trump|trump)/], ["That wall just got 10 feet higher, McCue.", "McCue is going to make Supreme great again!", "When McCue gets his White Castle, he better bring me some."]);
addTrigger([/(hillary|clinton|hillary clinton)/i], ["The lizard lady is watching you, Aaron.", "I found undeniable proof that Hillary is an alien. It's all over reddit.", "Arf! Arf! Arf!"]);
addTrigger([/Monday/i], ["I love mondays."]);
addTrigger([/bug/i], ["Can't we just write code without bugs?", "We wouldn't have a problem if you'd write your code without bugs.", "Did those silly developers even check the code for bugs?"]);
addTrigger([/(stand up|standup)/i], ["I'm not going to make it to the next standup ... hair ball...", "Let me know how standup goes... I'm taking a nap.", "I'd attend standup, but I have a massive hangover."]);
addTrigger([/(sandbox|sand box|sandboxes)/i], ["Uh, sorry guys, I thought that was the LITTER box...", "When you next use that sandbox, you're going to need a scoop.", "I'm using the sandbox right now. A little privacy please?"]);

var isPledging = false;
var pledgeIndex = 0;

export function humorMessages(message, rtm) {
    // <@U128LDPNC>
    triggerList.forEach((trigger) => {
        if(trigger.triggers.some((exp) => exp.test(message.text))) {
            rtm.sendMessage(trigger.messages[Math.floor(Math.random() * trigger.messages.length - 1)],
            'C03KL4SUN',
            () => console.log('Sent humor message'));
        }
    });
    
    if(/(pledge|allegiance|pledge of allegiance|flag)/i.test(message.text)
    && !isPledging) {
        pledgeIndex = 0;
        sayPledge(rtm);
    }

}
var pledge = [
    "I pledge allegiance",
    "to the Flag",
    "of the United States",
    "of America",
    "and to the Republic",
    "for which it stands",
    "one Nation",
    "under God",
    "with liberty",
    "and justice",
    "for all."
];
function sayPledge(rtm) {
    if(pledgeIndex >= pledge.length) {
        isPledging = false;
        pledgeIndex = 0;
        return;
    } else {
        rtm.sendMessage(pledge[pledgeIndex],
        'C03KL4SUN',
        () => setTimeout(()=> {
            pledgeIndex++;
            sayPledge(rtm);
        }, 800));
    }
}
