import { dnaRepository } from "../repository/DnaRepository";

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
            const hasMutation = true; // LOGIC HERE

            await dnaRepository.create({ dna, hasMutation });

            return hasMutation;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Returns the dna statistics with historical data
     */
    public stats = async (): Promise<{
        count_mutations: number,
        count_no_mutations: number,
        ratio: number,
    }> => {
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
