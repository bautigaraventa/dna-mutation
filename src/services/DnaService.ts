import { dnaRepository } from "../repository/DnaRepository";

interface Stats {
    count_mutations: number,
    count_no_mutations: number,
    ratio: number,
}

/**
 * DNA Service to manage extra functionalities
 */
export class DnaService {

    //#region Methods

    /**
     * Determines if the dna has mutation or not and saves the result
     * @param dna Array of strings representing a dna
     */
    public hasMutation = async (dna: string[]): Promise<boolean> => {
        try {
            const hasMutation: boolean = this.checkDnaMutation(dna);

            await dnaRepository.create({ dna, hasMutation });

            return hasMutation;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Recursive function to check each possibility of dna mutation
     * @param dna Array of strings representing the dna to check
     * @param rowPosition The dna row position to process
     * @param columnPosition The dna column position to process
     * @param mutatedSecuences Number of mutated secuences
     */
    private checkDnaMutation = (dna: string[], rowPosition = 0, columnPosition = 0, mutatedSecuences = 0): boolean => {
        const secuences: string[] = this.getSecuencesToCheck(dna, rowPosition, columnPosition)

        const filteredSecuences = secuences.filter((s) => Array.from(s).every((letter) => letter === s[0]));

        const newMutatedSecuences = mutatedSecuences + filteredSecuences.length;

        if (newMutatedSecuences >= 2) {
            return true;
        }

        if (dna[rowPosition][columnPosition + 1]) {
            return this.checkDnaMutation(dna, rowPosition, columnPosition + 1, newMutatedSecuences)
        } else if (dna[rowPosition + 1]) {
            return this.checkDnaMutation(dna, rowPosition + 1, 0, newMutatedSecuences);
        }

        return false;
    }

    /**
     * Return DNA possible secuences from a specific position
     * @param dna Array of strings representing the dna to check
     * @param rowPosition The dna row position to process
     * @param columnPosition The dna column position to process
     */
    private getSecuencesToCheck = (dna: string[], rowPosition: number, columnPosition: number): string[] => {
        const secuences = [];

        if (dna[rowPosition]?.[columnPosition + 3]) {
            secuences.push(dna[rowPosition].slice(columnPosition, 4));
        }

        if (dna[rowPosition + 3]?.[columnPosition + 3]) {
            const firstPosition = dna[rowPosition][columnPosition];
            const secondPosition = dna[rowPosition + 1][columnPosition + 1];
            const thirdPosition = dna[rowPosition + 2][columnPosition + 2];
            const fourthPosition = dna[rowPosition + 3][columnPosition + 3];
            secuences.push(firstPosition.concat(secondPosition).concat(thirdPosition).concat(fourthPosition));
        }

        if (dna[rowPosition + 3]?.[columnPosition]) {
            const firstPosition = dna[rowPosition][columnPosition];
            const secondPosition = dna[rowPosition + 1][columnPosition];
            const thirdPosition = dna[rowPosition + 2][columnPosition];
            const fourthPosition = dna[rowPosition + 3][columnPosition];
            secuences.push(firstPosition.concat(secondPosition).concat(thirdPosition).concat(fourthPosition));
        }

        if (dna[rowPosition + 3]?.[columnPosition - 3]) {
            const firstPosition = dna[rowPosition][columnPosition];
            const secondPosition = dna[rowPosition + 1][columnPosition - 1];
            const thirdPosition = dna[rowPosition + 2][columnPosition - 2];
            const fourthPosition = dna[rowPosition + 3][columnPosition - 3];
            secuences.push(firstPosition.concat(secondPosition).concat(thirdPosition).concat(fourthPosition));
        }

        return secuences;
    }

    /**
     * Returns the dna statistics with historical data
     */
    public stats = async (): Promise<Stats> => {
        try {
            const dnaStats = await dnaRepository.getAll();

            const count_mutations: number = dnaStats.filter((ds: any) => ds.hasMutation).length;
            const count_no_mutations: number = dnaStats.length - count_mutations;

            const ratio: number = count_mutations ? count_no_mutations ? count_mutations / count_no_mutations : 1 : 0;

            return {
                count_mutations,
                count_no_mutations,
                ratio,
            }
        } catch (error) {
            throw error;
        }
    }

    //#endregion

}

export const dnaService = new DnaService();
