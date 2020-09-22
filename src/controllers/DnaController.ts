import { Request, Response } from "express";
import { dnaService } from "../services/DnaService";

/**
 * DNA Controller to manage everything related to a DNA
 */
export class DnaController {

    //#region Methods

    /**
     * Determines if the dna has mutation or not
     * @param req 
     * @param res 
     */
    public mutation = async (req: Request, res: Response) => {
        try {
            const result = await dnaService.hasMutation(req.body.dna);
            result ? res.status(200).send(result) : res.status(403).send(result)
        } catch (error) {
            res.status(500).send({
                error: error.message,
            });
        }
    }

    /**
     * Returns the dna statistics with historical data
     * @param req 
     * @param res 
     */
    public stats = async (req: Request, res: Response) => {
        try {
            const result = await dnaService.stats();
            res.status(200).send(result);
        } catch (error) {
            res.status(500).send({
                error: error.message,
            });
        }
    }

    //#endregion

}

export const dnaController = new DnaController();