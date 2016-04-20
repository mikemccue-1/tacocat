export function pr_messages(count) {
    var possibles = [
        "Hey homeos, we got " + count + " PULL REQUESTS be open! Git on that shit!",
        "" + count + " PR's outstanding",
        "Yo yo! " + count + " PR's outstanding... out-effing-standing...",
        "I have HAD IT with these " + count + " monkey fightin' PRs on this monday-to-friday repository!",
        "BANG! " + count + " pull requests still open! -- Oh I'm sorry, did I break your concentration?"
    ];

    var which = getRandomInt(0, possibles.length - 1);

    return possibles[which];

}

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}