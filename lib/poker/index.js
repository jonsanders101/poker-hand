const HANDS = {
    straightFlush:
        {name: 'straight flush',
        rank: 1},
    fourOfAKind:
        {name: 'four of a kind',
        rank: 2},
    highCard:
        {name: 'high card',
        rank: 9}
};

const compareHands = (input) => {
    const {handOne, handTwo} = splitInput(input);
    readHand(handOne);
    readHand(handTwo);
    if (handOne.result.rank === handTwo.result.rank) {
        // handle same hands
    }
    const winningHand =  [handOne, handTwo].sort((a, b) => {
        return a.result.rank - b.result.rank;
    })[0]
        return resultString(winningHand);
};

const resultString = winningHand => `${winningHand.player} wins. - with ${winningHand.result.name}`

const splitInput = input => {
    const splitString = input.split(' ');
    const handOneName = splitString[0].slice(0, splitString[0].length - 1);
    const handTwoName = splitString[0].slice(0, splitString[0].length - 1)
    const handOneCards = splitString.slice(1, 6);
    const handTwoCards = splitString.slice(7, 12);
    return {
        handOne: {
        player: handOneName,
        cards: handOneCards
        }, 
        handTwo: {
        player: handTwoName,
        cards: handTwoCards
        }
    }
};

const readHand = hand => {
    switch (true) {
        case isStraightFlush(hand.cards):
            hand.result = HANDS.straightFlush;
            return hand;
        default:
            hand.result = HANDS.highCard;
            return hand;
    }
};

const isStraightFlush = hand => {
    return isFlush(hand) && isStraight(hand)
};

const isFlush = hand => {
    return Object.values(matchingSuits(hand)).includes(5);
};

const isStraight = hand => {
    const orderedValues = orderValues(hand);
    return orderedValues.every((value, index, array) => {
        return index === (array.length - 1) || (array[index + 1] - 1) === value;
    });
};

const matchingSuits = hand => {
    return hand.reduce((countedSuits, card, _, hand) => {
        let suit = card[card.length - 1];
        countedSuits[suit] = hand.reduce((count, card) => {
            if (card[card.length - 1] === suit) {
                count++;
            }
            return count;
        }, 0);
        return countedSuits;
    }, {}) ;
}

const orderValues = hand => {
    return hand.map(card => {
        let value = card.slice(0, card.length - 1);
        value = evaluateRoyalty(value);
        return value;
    }).sort((a, b) => a - b)
};

const evaluateRoyalty = value => {
    switch (value) {
    case 'J':
        return 11
   case 'Q':
       return 12
   case 'K':
       return 13
   case 'A':
       return 14
   default:
        return parseInt(value);
    }
}

export default compareHands;