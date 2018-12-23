import * as express from 'express';
import * as bodyParser from "body-parser"; //used to parse the form data that you pass in the request

import { DbServer } from "./dbServer";
import { noteRoutes } from "./app/routes/note.routes";

class App {
    public app: express.Application;

    constructor() {
        this.app = express(); //run the express instance and store in app
        this.config();
        new DbServer().connectdb();
        new noteRoutes(this.app);
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());

        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({
            extended: false
        }));

        this.app.set('trust proxy', true);

        // define CROS
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    }
}

export default new App().app;
