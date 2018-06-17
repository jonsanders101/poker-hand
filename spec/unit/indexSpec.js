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
    describe('Given that both Black and White have a four of a kind, but Black\'s is higher', () => {
        it('Should report that black has won', () => {
            const inputString = 'Black: AH AC AD AS 10H White: KH KC KD KS JH';
            expect(compareHands(inputString)).toEqual('Black wins. - with four of a kind');
        });
    });
    describe('Given that Black has a three of a kind and white has a pair', () => {
        it('Should report that black has won', () => {
            const inputString = 'Black: AH AC AD KS QH White: KD KS QD JS 10H';
            expect(compareHands(inputString)).toEqual('Black wins. - with three of a kind');
        });
    });
    describe('Given that both Black and White have a three of a kind, but Black\'s is higher', () => {
        it('Should report that black has won', () => {
            const inputString = 'Black: AH AC AD KS QH White: QD QS QD JS 10H';
            expect(compareHands(inputString)).toEqual('Black wins. - with three of a kind');
        });
    });
    describe('Given that both Black has a full house and White has a three of a kind', () => {
        it('Should report that black has won', () => {
            const inputString = 'Black: AH AC AD KS KH White: QD QS QD JS 10H';
            expect(compareHands(inputString)).toEqual('Black wins. - with full house');
        });
    });
    describe('Given that both Black and White have a full house, but Black\'s matching three is higher', () => {
        it('Should report that black has won', () => {
            const inputString = 'Black: AH AC AD KS KH White: QD QS QD JS JH';
            expect(compareHands(inputString)).toEqual('Black wins. - with full house');
        });
    });
    describe('Given that Black has a flush but White has a three of a kind', () => {
        it('Should report that black has won', () => {
            const inputString = 'Black: AH 2H AH 3H KH White: QD QS QD 10S JH';
            expect(compareHands(inputString)).toEqual('Black wins. - with flush');
        });
    });
    describe('Given that Black and White both have a flush, but Black\'s is higher', () => {
        it('Should report that black has won', () => {
            const inputString = 'Black: AH KH QH 10H 9H White: KD QD 10D 9D 8D';
            expect(compareHands(inputString)).toEqual('Black wins. - with flush');
        });
    });
    describe('Given that Black has a straight and White has a three of a kind', () => {
        it('Should report that Black has won', () => {
            const inputString = 'Black: AH KC QH JH 10H White: KD KH KS 10D 9D';
            expect(compareHands(inputString)).toEqual('Black wins. - with straight');
        });
    });
    describe('Given that Black and White both have a straight, but Black\'s is higher', () => {
        it('Should report that black has won', () => {
            const inputString = 'Black: AH KC QH JH 10H White: KD QS JS 10D 9D';
            expect(compareHands(inputString)).toEqual('Black wins. - with straight');
        });
    });
});