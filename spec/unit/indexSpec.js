import compareHands from '../../lib/poker';

describe('compareHands', () => {
    describe('Given that Black as a straight flush and White has a Four of a Kind', () => {
        it('Should report that black has won', () => {
            const inputString = 'Black: AH KH QH JH 10H White: AH AC AD AS 10H';
            expect(compareHands(inputString)).toEqual('Black wins. - with straight flush');
        });
    })
});