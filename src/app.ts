
import * as express from "express";
import * as bodyParser from "body-parser";
import { dnaRoutes } from "./routes/DnaRoutes";
import * as mongoose from 'mongoose';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        // Database
        mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

        // support application/json
        this.app.use(bodyParser.json());

        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));

        // Routing
        this.app.use("/", dnaRoutes);
    }
}

export default new App().app;