import {MysqlManager} from './db';
import HttpServer from './HttpServer'

try {
    MysqlManager.init();
    new HttpServer().start();
} catch (e) {
    console.log("error: ", e);
}

