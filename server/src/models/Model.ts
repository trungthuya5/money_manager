import {MysqlManager} from "../db";
import {FetchManager} from "../test/FetchManager";
import {ModelTest} from "./ModelTest";

export class Model {

    // private static _instance: ModelTest;
    //
    // public static get instance(): ModelTest {
    //     return this._instance || (this._instance = new this())
    // }

    private static _instance: Model;

    public static get instance(): Model {
        return this._instance || (this._instance = new this())
    }

    public async select<T>(sql: string, options?: any) {

        const conn = await MysqlManager.getInstance().getDataSource();
        // console.log(conn)
        const ret = await conn.query(sql, options);
        return ret[0] as T[]
    }

    public async selectOne<T>(sql: string, options?: any) {

        const conn = await MysqlManager.getInstance().getDataSource();
        const ret = await conn.query(sql, options);

        if (Array.isArray(ret[0])) {
            return ret[0][0] as T
        }

        return undefined
    }

    public async count(sql: string, options?: unknown) {
        const ret = await MysqlManager.getInstance().getDataSource().query(sql, options);
        return <Number><unknown>ret[0]
    }

    public async insert(table: string, data: any) {
        // Lưu trữ danh sách field
        let field = '';
        // Lưu trữ danh sách giá trị tương ứng với field
        let value = '';

        Object.keys(data).forEach((key) => {
            field += `,${key}`;
            value += `,'${data[key]}'`
        });

        const sql = `INSERT INTO \`${table}\`(${field.replace(/^,+/, '')}) VALUES (${value.replace(/^,+/, '')})`;
        const database = await MysqlManager.getInstance().getDataSource();
        const ret = await database.query(sql);
        return ret[0];
    }

    public async update(table: string, data:any, where:any){

        let sql:string = ""
        let wh:string = ""

        Object.keys(data).forEach((key) => {
            sql = `${key}='${data[key]}',`
        });

        Object.keys(where).forEach((key)=>{
            wh += `${key}='${where[key]}',`
        })

        sql = `UPDATE \`${table}\` SET ${sql.replace(/,+$/,"")} WHERE ${wh.replace(/,+$/,"")}`

        console.log(sql)
        const database = await MysqlManager.getInstance().getDataSource();
        const ret = await database.query(sql);
        return ret
    }

    public async findAll(table:string, where:any){

        let wh:string="";

        Object.keys(where).forEach((key)=>{
            wh += `${key}='${where[key]}',`
        })

        const sql = `SELECT * FROM \`${table}\` WHERE ${wh.replace(/,+$/,"")}`
        const database = await MysqlManager.getInstance().getDataSource();
        const ret = await database.query(sql);
        return ret[0]
    }

    public async findOne(table:string, where:any){

        let wh:string="";
        Object.keys(where).forEach((key)=>{
            wh += `${key}='${where[key]}',`
        })

        const sql = `SELECT * FROM \`${table}\` WHERE ${wh.replace(/,+$/,"")}`
        const database = await MysqlManager.getInstance().getDataSource();
        const ret = await database.query(sql);
        if(Array.isArray(ret[0]))
            return ret[0][0]
    }


}