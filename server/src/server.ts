// import 'reflect-metadata';

// import application from './application';
// import * as http from 'http';

// const PORT = process.env.PORT || 3000;

// const server = http.createServer(application.instance);

// server.listen(PORT, () => {
//   console.log(`Server is listening on :${PORT}`);
// });

import {MysqlManager} from './db';
import HttpServer from './HttpServer'
import {query} from "express";
import {OkPacket, RowDataPacket} from "mysql2";
import {IUser, User} from "./entity/User";
// import {test1} from "./controllers/test";


try {






    // let a = {
    //     id: 12,
    //     username: "string",
    //     password: "string",
    //     fullname: "string",
    //     aa: "asda"
    // }
    //
    //
    //
    // let aa = <User>a as IUser
    //
    // console.log(aa)
    MysqlManager.init();
    new HttpServer().start();
     test();

} catch (e) {
    console.log("error: ", e);
}

import fetch from "node-fetch";
import axios from "axios";
import {GroupModel} from "./models/GroupModel";
import {Model} from "./models/Model";
import {ModelTest} from "./models/ModelTest";
async function test() {
let HOST = 'http://localhost:3000/'
    // let signin = await fetch(HOST + 'auth/signin', {
    //     method: 'post',
    //     body: JSON.stringify({
    //         username: 'trungthuya5',
    //         password: '123456'
    //     }),
    //     headers: {'Content-Type': 'application/json'}
    // });
    // let a = await axios.get("/auth/signin")
    // console.log(a)

   // console.log(await signin.json())

    //await sleep(8000)

    //await test1()
    // let conn = await MysqlManager.getInstance().getDataSource()
    // let q = 'UPDATE user SET fullname=1 where id=66'
    // let a = 'SELECT COUNT(*) as count FROM user WHERE id=100'
    // const ret = await conn.query(a);
    // console.log(ret[0])
    // console.log(ret)


}


function sleep(ms:number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

