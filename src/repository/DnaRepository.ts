import * as mongoose from 'mongoose';
var DnaStatModel = mongoose.model('DnaStat');

/**
 * Database access implementation for the entity "DNA"
 */
export class DnaRepository {

    /**
     * Creates, stores and returns a DnaStat
     * @param body Body to create a DnaStat
     */
    create(body: any) {
        try {
            return DnaStatModel.create(body);
        } catch (error) {
            throw new Error(`Error creating a DnaStat`);
        }
    }

    /**
     * Returns all DnaStats from the storage
     */
    getAll() {
        try {
            return DnaStatModel.find({});
        } catch (error) {
            throw new Error(`Error getting DnaStats`);
        }
    }

}

export const dnaRepository = new DnaRepository();