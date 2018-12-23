import * as mongoose from "mongoose";

export class DbServer {
    private mongoURL = 'mongodb://@ds111244.mlab.com:11244/demomongodb';
    private userAuth = {
        useNewUrlParser: true,
        auth: {
            user: 'adminUser',
            password: 'admin@mlabdb7'
        }
    };
    public connectdb() {
        mongoose.connect(this.mongoURL, this.userAuth)
            .then(() => {
                console.log("Successfully connected to the database");
            })
            .catch(err => {
                console.log('Could not connect to the database. Exiting now...');
                process.exit();
            });
    };
}

