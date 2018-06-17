import compareHands from '../../lib/poker';

describe('compareHands', () => {
    describe('Given that Black has a straight flush and White has a Four of a Kind', () => {
        it('Should report that black has won', () => {
            const inputString = 'Black: AH KH QH JH 10H White: AH AC AD AS 10H';
            expect(compareHands(inputString)).toEqual('Black wins. - with straight flush');
        });
    })
    describe('Given that both hands are straight flushes, and Black has higher values', () => {
        it('Should report thatblack has won', () => {
            const inputString = 'Black: AH KH QH JH 10H White: KD QD JD 10D 9D';
            expect(compareHands(inputString)).toEqual('Black wins. - with straight flush');
        });
    });
    describe('Given that both hands are straight flushes with the same values, but Black has a higher suit', () => {
        it('Should report thatblack has won', () => {
            const inputString = 'Black: AH KH QH JH 10H White: AC KC QC JC 10C';
            expect(compareHands(inputString)).toEqual('Black wins. - with straight flush');
        });
    });
    describe('Given that both Black has a four of a kind and White has a three of a kind', () => {
        it('Should report that black has won', () => {
            const inputString = 'Black: AH AC AD AS 10H White: KH KC KD QS JH';
            expect(compareHands(inputString)).toEqual('Black wins. - with four of a kind');
        });
    });
});