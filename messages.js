export function pr_messages(pr_array) {
    
    var links = pr_array.map((pr) => pr.links.self[0].href).join('\n');
    
    var possibles = [
        "Hey homeos, we got " + pr_array.length + " PULL REQUESTS be open! Git on that shit!",
        "" + pr_array.length + " PR's outstanding",
        "Yo yo! " + pr_array.length + " PR's outstanding... out-effing-standing...",
        "I have HAD IT with these " + pr_array.length + " monkey fightin' PRs on this monday-to-friday repository!",
        "BANG! " + pr_array.length + " pull requests still open! -- Oh I'm sorry, did I break your concentration?"
    ];

    var which = getRandomInt(0, possibles.length - 1);

    return possibles[which] + '\n' + links;

}

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}