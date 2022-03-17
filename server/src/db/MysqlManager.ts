import {Connection, createConnection, createPool, Pool} from 'mysql2/promise';

export class MysqlManager {


    private static thisBean: MysqlManager;
    private _dataSource: any;

    private constructor() {
        this._dataSource = createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'money'
        }).then(value => {
            this.setDataSource(value)
            console.log("start database success!")
            return value;
        });
    }

    public static getInstance(): MysqlManager {
        return this.thisBean;
    }

    public static init(){
         this.thisBean = new MysqlManager();
    }

    public getDataSource(): Connection{
        return this._dataSource;
    }

    public setDataSource(dataSource: Connection) {
        this._dataSource = dataSource;
    }
}