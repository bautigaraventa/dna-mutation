import { DnaService } from './DnaService';
import { dnaRepository } from '../repository/DnaRepository';
jest.mock('mongoose')
let dnaServiceTest: DnaService;

beforeEach(() => {
    dnaServiceTest = new DnaService();
});

describe('Function: hasMutation', () => {

    it('Given a mutated DNA, should return true', async (done) => {
        // Arrange
        const dnaDummy = [
            "ATCG",
            "AGGG",
            "ATTG",
            "ATCG",
        ];
        dnaServiceTest['checkDnaMutation'] = jest.fn().mockReturnValue(true);
        dnaRepository.create = jest.fn();
        let result;

        // Act
        try {
            result = await dnaServiceTest.hasMutation(dnaDummy);
        } catch (error) {
            done(error);
        }

        // Assert
        expect(result).toBe(true);
        done();
    });

    it('Given a not mutated DNA, should return false', async (done) => {
        // Arrange
        const dnaDummy = [
            "ATCG",
            "AGGG",
            "ATTG",
            "ATCG",
        ];
        dnaServiceTest['checkDnaMutation'] = jest.fn().mockReturnValue(false);
        dnaRepository.create = jest.fn();
        let result;

        // Act
        try {
            result = await dnaServiceTest.hasMutation(dnaDummy);
        } catch (error) {
            done(error);
        }

        // Assert
        expect(result).toBe(false);
        done();
    });

});

describe('Function: getSecuencesToCheck', () => {

    it('Given a dna, a position (a row and a column), should return the right horizontal secuence', async (done) => {
        // Arrange
        const dnaDummy = [
            "ATCG",
            "AGGG",
            "ATTG",
            "ATCG",
        ];
        const rightSecuence = "ATCG";
        let result;

        // Act
        try {
            result = await dnaServiceTest['getSecuencesToCheck'](dnaDummy, 0, 0);
        } catch (error) {
            done(error);
        }

        // Assert
        expect(result).toContain(rightSecuence);
        done();
    });

    it('Given a dna, a position (a row and a column), should return the diagonally down to the right secuence', async (done) => {
        // Arrange
        const dnaDummy = [
            "ATCG",
            "AGGG",
            "ATTG",
            "ATCG",
        ];
        const diagonallyDownToTheRightSecuence = "AGTG";
        let result;

        // Act
        try {
            result = await dnaServiceTest['getSecuencesToCheck'](dnaDummy, 0, 0);
        } catch (error) {
            done(error);
        }

        // Assert
        expect(result).toContain(diagonallyDownToTheRightSecuence);
        done();
    });

    it('Given a dna, a position (a row and a column), should return the down horizontal secuence', async (done) => {
        // Arrange
        const dnaDummy = [
            "ATCG",
            "AGGG",
            "ATTG",
            "ATCG",
        ];
        const downSecuence = "AAAA";
        let result;

        // Act
        try {
            result = await dnaServiceTest['getSecuencesToCheck'](dnaDummy, 0, 0);
        } catch (error) {
            done(error);
        }

        // Assert
        expect(result).toContain(downSecuence);
        done();
    });

    it('Given a dna, a position (a row and a column), should return the diagonally down to the left secuence', async (done) => {
        // Arrange
        const dnaDummy = [
            "ATCG",
            "AGGG",
            "ATTG",
            "ATCG",
        ];
        const diagonallyDownToTheLeftSecuence = "GGTA";
        let result;

        // Act
        try {
            result = await dnaServiceTest['getSecuencesToCheck'](dnaDummy, 0, 3);
        } catch (error) {
            done(error);
        }

        // Assert
        expect(result).toContain(diagonallyDownToTheLeftSecuence);
        done();
    });

});

describe('Function: stats', () => {

    it('If there are no mutated and mutated dna, Should return count_mutations and count_no_mutations from database, also ratio as count_mutations/count_no_mutations', async (done) => {
        // Arrange
        const dnaStatsDummy = [
            {_id: '1', dna: ["AAAA", "TTTT", "CCCC", "GGGG"], hasMutation: true},
            {_id: '2', dna: ["AAAA", "TTTT", "CCCC", "GGGG"], hasMutation: true},
            {_id: '3', dna: ["AAAA", "TTTT", "CCCC", "GGGG"], hasMutation: false},
            {_id: '4', dna: ["AAAA", "TTTT", "CCCC", "GGGG"], hasMutation: true},
        ];
        dnaRepository.getAll = jest.fn().mockReturnValue(dnaStatsDummy);
        const resultDummy = {
            count_mutations: 3,
            count_no_mutations: 1,
            ratio: 3/1
        }
        let result;

        // Act
        try {
            result = await dnaServiceTest.stats();
        } catch (error) {
            done(error);
        }

        // Assert
        expect(result).toStrictEqual(resultDummy);
        done();
    });

    it('If no DNA has mutation, Should return ratio=0', async (done) => {
        // Arrange
        const dnaStatsDummy = [
            {_id: '1', dna: ["AAAA", "TTTT", "CCCC", "GGGG"], hasMutation: false},
            {_id: '2', dna: ["AAAA", "TTTT", "CCCC", "GGGG"], hasMutation: false},
            {_id: '3', dna: ["AAAA", "TTTT", "CCCC", "GGGG"], hasMutation: false},
            {_id: '4', dna: ["AAAA", "TTTT", "CCCC", "GGGG"], hasMutation: false},
        ];
        dnaRepository.getAll = jest.fn().mockReturnValue(dnaStatsDummy);
        const resultDummy = {
            count_mutations: 0,
            count_no_mutations: 4,
            ratio: 0
        }
        let result;

        // Act
        try {
            result = await dnaServiceTest.stats();
        } catch (error) {
            done(error);
        }

        // Assert
        expect(result).toStrictEqual(resultDummy);
        done();
    });

    it('If no DNA has no mutation but some DNA have mutation, Should return ratio=1', async (done) => {
        // Arrange
        const dnaStatsDummy = [
            {_id: '1', dna: ["AAAA", "TTTT", "CCCC", "GGGG"], hasMutation: true},
            {_id: '2', dna: ["AAAA", "TTTT", "CCCC", "GGGG"], hasMutation: true},
            {_id: '3', dna: ["AAAA", "TTTT", "CCCC", "GGGG"], hasMutation: true},
            {_id: '4', dna: ["AAAA", "TTTT", "CCCC", "GGGG"], hasMutation: true},
        ];
        dnaRepository.getAll = jest.fn().mockReturnValue(dnaStatsDummy);
        const resultDummy = {
            count_mutations: 4,
            count_no_mutations: 0,
            ratio: 1
        }
        let result;

        // Act
        try {
            result = await dnaServiceTest.stats();
        } catch (error) {
            done(error);
        }

        // Assert
        expect(result).toStrictEqual(resultDummy);
        done();
    });
    
});
