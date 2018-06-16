const compareHands = (input) => {
    const {blackHand, whiteHand} = splitInput(input);
    const result = '';
    if (isStraightFlush(blackHand) && !isStraightFlush(whiteHand)) {
        return 'Black wins. - with straight flush';
    }
    return result;
};

const splitInput = input => {
    const splitString = input.split(' ');
    const blackHand = splitString.slice(1, 6);
    const whiteHand = splitString.slice(7, 12);
    return {blackHand, whiteHand}
};

const isStraightFlush = hand => {
    return isFlush(hand) && isStraight(hand);
};

const isFlush = hand => {
    return Object.values(matchingSuits(hand)).includes(5);
};

const isStraight = hand => {
    const orderedValues = orderValues(hand);
};

const matchingSuits = hand => {
    return hand.reduce((countedSuits, card, index, hand) => {
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

const orderedValues = hand => {
    return hand.map(card => {
        let value = card.slice(0, card.length - 1);
        value = evaluateRoyalty(value);
        return value;
    }).sort((a, b) => a - b)
};

const evaluateRoyalty = value => {
    switch value
    case 'J'
       return 11
   case 'Q'
       return 12
   case 'K'
       return 13
   case 'A'
       return 14
   default
        return value;
}

export default compareHands;