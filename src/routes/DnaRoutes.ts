import * as express from "express";
import { dnaController } from "../controllers/DnaController";
import { dnaValidator } from '../validators/DnaValidators';

class DnaRoutes {
    public router: express.Router = express.Router();

    constructor() {
        this.init();
    }

    private init(): void {

        this.router.post(
            `/mutation`,
            dnaValidator.mutation,
            dnaValidator.isValidDNA(),
            dnaController.mutation,
        );

        this.router.get(
            `/stats`,
            dnaController.stats,
        );

    }
}

export const dnaRoutes = new DnaRoutes().router;