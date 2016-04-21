var hungryTriggers = [
    /^\/me is (still |also |now )?hungry|continues being hungry/i,
    /^(i( am|\'m) hungry|(suggest|dispense|invent) (meal|food))/i,
    /^(i( am|\'m) (still|also|now) hungry|(suggest|dispense|invent) (meal|food))/i,
    /^what(s|\'s| is) for (lunch|dinner|breakfast)/i
];
var notHungryTriggers = [
    /^(i( am|\'m) not hungry)/i
];

var foodTemplates = [
    'a {0} taco',
    'a {0} and {1} burrito',
    'deep-fried {0} quesadillas',
    'a {0} churro topped with {1}',
    '{0} and {1} chimichangas',
    'sopapillas with {0}',
    'flans topped with {0}',
    'jalapenos with {0}',
    'a {0} omelette',
    'a {0} and {1} omelette',
    '{0} cake with {1}-flavored frosting',
    'fish-shaped {0}'
];
var ingredients = [
    'ham', 'cheese', 'bacon', 'cheerios', 'vermouth',
    'egg', 'whipped cream', 'skittles', 'newt', 'lettuce', 'tomato',
    'chicken', 'quorn', 'sediment', 'shrimp', 'bread', 'steak',
    'pork', 'fish', 'apple', 'onion', 'death cap mushroom', 'boomerang hammer',
    'marmite', 'squirrel', 'possum',
    'meow-mix', 'fancy feast', 'purina friskies', 'whiskas',
    'tuna', 'salmon', 'milk', 'propelyne glycol'
];

export function checkFoodMessages(message, rtm) {
    // <@U128LDPNC>
    if (notHungryTriggers.some((exp) => exp.test(message.text))) {
        rtm.sendMessage('Thanks for sharing, <@' + message.user + '>',
            'C03KL4SUN', () => console.log('Sent thanks for sharing')
        );
    }
    else if (hungryTriggers.some((exp) => exp.test(message.text))) {
        var recipe = foodTemplates[Math.floor(Math.random() * (foodTemplates.length - 1))];
        var ingredientOne = ingredients[Math.floor(Math.random() * (ingredients.length - 1))];
        var ingredientTwo = ingredients[Math.floor(Math.random() * (ingredients.length - 1))];
        recipe = recipe.replace('{0}', ingredientOne)
            .replace('{1}', ingredientTwo);
        rtm.sendMessage('I know, <@' + message.user + '>! You should make ' + recipe,
        'C03KL4SUN', () => console.log('Sent food'));
    }
}