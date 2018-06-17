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
        return resultString(sameHand(handOne, handTwo));
    }
    const winningHand =  [handOne, handTwo].sort((a, b) => {
        return a.result.rank - b.result.rank;
    })[0]
        return resultString(winningHand);
};

const sameHand = (handOne, handTwo) => {
    switch (handOne.result.name) {
        case 'straight flush':
            return bestStraightFlush(handOne, handTwo);
        case 'four of a kind':
            return bestFourOfAKind(handOne, handTwo);
        default:
            return; 
    }
};

const bestFourOfAKind = (handOne, handTwo) => {
    return [handOne, handTwo].reduce((highest, current) => {
        return getCardValueByCount(current, 4) > getCardValueByCount(highest, 4) ? current : highest;
    });
};

const getCardValueByCount = (hand, count) => {
    return Object.entries(matchingValues(hand.cards)).find(countedValue => {
        return countedValue[1] === count;
    })[0]
}

const bestStraightFlush = (handOne, handTwo) => {

    return [handOne, handTwo].sort((a, b) => {
        const highestA = orderValues(a.cards)[a.cards.length -1];
        const highestB = orderValues(b.cards)[b.cards.length -1];
        if (highestA === highestB) {
            return highestSuit(highestA, highestB);
        }
        return highestA - highestB;
    })[1];
};

const highestSuit = (cardA, cardB) => {
    return [cardA[cardA.length - 1], cardB[cardB.length - 1]].reduce((highest, current) => {
        return evaluateSuit(current) > evaluateSuit(highest) ? evaluateSuit(current) : evaluateSuit(highest);
    });
};

const evaluateSuit = suit => {
    switch(suit) {
    case 'C':
        return 1;
    case 'D':
        return 2;
    case 'H':
        return 3;
    case 'S':
        return 4;
    }
}

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

const isFourOfAKind = cards => {
    return Object.values(matchingValues(cards)).includes(4);
};

const readHand = hand => {
    switch (true) {
        case isStraightFlush(hand.cards):
            hand.result = HANDS.straightFlush;
            return hand;
        case isFourOfAKind(hand.cards):
            hand.result = HANDS.fourOfAKind;
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

const matchingValues = cards => {
    return cards.reduce((countedValues, card, _, cards) => {
        let value = getValueFromCard(card);
        countedValues[value] = cards.reduce((count, card) => {
            if (getValueFromCard(card) === value) {
                count++;
            }
            return count;
        }, 0);
        return countedValues;
    }, {}) ;
}

const getValueFromCard = card => card.slice(0, card.length - 1);

const orderValues = hand => {
    return hand.map(card => {
        let value = getValueFromCard(card);
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