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
    "I pledge allegiance\r\nhttp://www.usaflagsupply.com/media/catalog/product/cache/1/image/5e06319eda06f020e43594a9c230972d/f/i/file_3_3.jpg",
    "to the Flag\r\nhttp://www.telegraphcrossfit.com/wp-content/uploads/2013/07/american-flag-2-300x225.jpg",
    "of the United States\r\nhttp://cdn.playbuzz.com/cdn/0fe850d3-4834-4bc8-8d1c-86f8e72e0610/dee06b7c-a184-43fd-901d-3a4d796b0d06.jpg",
    "of America\r\nhttps://s-media-cache-ak0.pinimg.com/236x/66/0b/93/660b93b2d27998dd7c4149581cbda12e.jpg",
    "and to the Republic\r\nhttp://micahburkette.com/wp-content/uploads/2012/02/407302_10151222117605401_827685400_22137879_319074720_n.jpg",
    "for which it stands\r\nhttp://7-themes.com/data_images/out/8/6793634-free-patriotic-wallpaper.jpg",
    "one Nation\r\nhttps://cdn3.volusion.com/qr294.ndw29/v/vspfiles/photos/LB-11187-4.jpg?1455492827",
    "indivisible\r\nhttps://s-media-cache-ak0.pinimg.com/736x/13/26/5e/13265e88790ebd339353ded0ac4bc95a.jpg",
    "under God\r\nhttp://www.freeweekly.com/wp-content/uploads/2014/07/TFW-7.3.14-A1.jpg",
    "with liberty\r\nhttp://www.porterfieldsfineart.com/images/Patriotic%20Kittens72.jpg",
    "and justice\r\nhttp://cdn01.dailycaller.com/wp-content/uploads/2012/11/Cat-1-e1352318861701.jpg",
    "for all.\r\nhttp://politicalillusionsexposed.com/wp-content/uploads/2014/11/Grumpiest-Patriot.gif"
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
        }, 1200));
    }
}
