const HANDS = {
    straightFlush:
        {name: 'straight flush',
        rank: 8},
    fourOfAKind:
        {name: 'four of a kind',
        rank: 7},
    fullHouse:
        {name: 'full house',
        rank: 6},
    flush:
        {name: 'flush',
        rank: 5},
    straight:
        {name: 'straight',
        rank: 4},
    threeOfAKind:
        {name: 'three of a kind',
        rank: 3},
    twoPair:
        {name: 'two pair',
        rank: 2},
    highCard:
        {name: 'high card',
        rank: 1},
};

const compareHands = (input) => {
    const {handOne, handTwo} = splitInput(input);
    readHand(handOne);
    readHand(handTwo);
    if (handOne.result.rank === handTwo.result.rank) {
        return resultString(sameHand(handOne, handTwo));
    }
    const winningHand = [handOne, handTwo].reduce((currentHighestHand, currentHand) => {
        return currentHighestHand.result.rank > currentHand.result.rank ? currentHighestHand : currentHand
    })
        return resultString(winningHand);
};

const sameHand = (handOne, handTwo) => {
    switch (handOne.result.name) {
        case 'straight flush':
            return bestStraightOrFlush(handOne, handTwo);
        case 'four of a kind':
            return bestMatchingSet(handOne, handTwo, 4);
        case 'three of a kind':
            return bestMatchingSet(handOne, handTwo, 3);
        case 'full house':
            return bestMatchingSet(handOne, handTwo, 3);
        case 'flush':
            return bestStraightOrFlush(handOne, handTwo);
        case 'straight':
            return bestStraightOrFlush(handOne, handTwo);
        case 'two pair':
            return bestTwoPair(handOne, handTwo);
        default:
            return; 
    }
};

const bestTwoPair = (handOne, handTwo) => {
        const orderedOne = orderValues(handOne.cards);
        const orderedTwo = orderValues(handTwo.cards);
        for (let i = orderedOne.length - 1; i => 0; i--) {
            if (orderedOne[i] > orderedTwo[i]) {
                return handOne;
            }
            if (orderedOne[i] < orderedTwo[i]) {
                return handTwo;
            }
        }

        return 'Equal hands!';
};

const bestMatchingSet = (handOne, handTwo, match) => {
    return [handOne, handTwo].reduce((currentHighestHand, currentHand) => {
        return getCardValueByCount(currentHand, match) > getCardValueByCount(currentHighestHand, match) ? currentHand : currentHighestHand;
    });
};

const getCardValueByCount = (hand, count) => {
    return Object.entries(matchingValues(hand.cards)).find(countedValue => {
        return countedValue[1] === count;
    })[0]
};

const bestStraightOrFlush = (handOne, handTwo) => {
    return [handOne, handTwo].reduce((currentHighestHand, currentHand) => {
        if (typeof currentHighestHand === 'string') {
            return currentHighestHand;
        }
        const highestA = orderValues(currentHighestHand.cards)[currentHighestHand.cards.length -1];
        const highestB = orderValues(currentHand.cards)[currentHand.cards.length -1];
        if (highestA === highestB) {
            return 'Equal hands!';
        }
        return highestA > highestB ? currentHighestHand : currentHand;
    });
};

const resultString = winningHand => {
 return typeof winningHand === 'string' ? winningHand : `${winningHand.player} wins. - with ${winningHand.result.name}`
};

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

const isMatchingSet = (cards, match) => {
    return Object.values(matchingValues(cards)).includes(match);
};

const isFullHouse = cards => {
    return isMatchingSet(cards, 3) && isMatchingSet(cards, 2);
};

const readHand = hand => {
    switch (true) {
        case isStraightFlush(hand.cards):
            hand.result = HANDS.straightFlush;
            return hand;
        case isMatchingSet(hand.cards, 4):
            hand.result = HANDS.fourOfAKind;
            return hand;
        case isFullHouse(hand.cards):
            hand.result = HANDS.fullHouse;
            return hand;
        case isFlush(hand.cards):
            hand.result = HANDS.flush;
            return hand;
        case isStraight(hand.cards):
            hand.result = HANDS.straight;
            return hand;
        case isMatchingSet(hand.cards, 3):
            hand.result = HANDS.threeOfAKind;
            return hand;
        case isTwoPair(hand.cards):
            hand.result = HANDS.twoPair;
            return hand;
        default:
            hand.result = HANDS.highCard;
            return hand;
    }
};

const isTwoPair = (cards) => {
    return Object.values(matchingValues(cards)).filter(value => value === 2).length === 2;
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

const matchingSuits = cards => {
    return cards.reduce((countedSuits, currentCard, _, cards) => {
        let suit = currentCard[currentCard.length - 1];
        countedSuits[suit] = cards.reduce((count, card) => {
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