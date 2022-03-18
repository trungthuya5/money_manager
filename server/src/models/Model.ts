import {MysqlManager} from "../db";
import {OkPacket} from "mysql2";

export class Model {

    protected async count(sql: string, options?: unknown) {
        const ret = await MysqlManager.getInstance().getDataSource().query(sql, options);
        return <Number><unknown>ret[0]
    }

    protected async create(table: string, data: any) {
        let field = '';
        let value = '';

        Object.keys(data).forEach((key) => {
            field += `,${key}`;
            value += `,'${data[key]}'`
        });

        const sql = `INSERT INTO \`${table}\`(${field.replace(/^,+/, '')}) VALUES (${value.replace(/^,+/, '')})`;
        const database = await MysqlManager.getInstance().getDataSource();
        const ret = await database.query<OkPacket>(sql);

        return ret[0].affectedRows > 0
    }

    protected async update(table: string, data: any, where: any) {

        let sql: string = ""
        let wh: string = ""

        Object.keys(data).forEach((key) => {
            sql = `${key}='${data[key]}',`
        });


        if(Object.keys(where).length != 0){
            Object.keys(where).forEach((key) => {
                wh += `${key}='${where[key]}' AND `
            })

            wh = `WHERE ${wh.replace(/AND $/,"")}`
        }

        sql = `UPDATE \`${table}\` SET ${sql.replace(/,+$/,"")} ${wh}`

        const database = await MysqlManager.getInstance().getDataSource();
        const ret = await database.query<OkPacket>(sql);

        return ret[0].affectedRows > 0
    }

    protected async all(table: string, where: any) {

        let wh: string = "";

        if(Object.keys(where).length != 0){
            Object.keys(where).forEach((key) => {
                wh += `${key}='${where[key]}' AND `
            })

            wh = `WHERE ${wh.replace(/AND $/,"")}`
        }

        const sql = `SELECT * FROM \`${table}\` ${wh}`
        const database = await MysqlManager.getInstance().getDataSource();
        const ret = await database.query(sql);
        return ret[0]
    }

    protected async find(table: string, where: any) {

        let wh: string = "";

        if(Object.keys(where).length != 0){
            Object.keys(where).forEach((key) => {
                wh += `${key}='${where[key]}' AND `
            })

            wh = `WHERE ${wh.replace(/AND $/,"")}`
        }

        const sql = `SELECT * FROM \`${table}\` ${wh}`
        const database = await MysqlManager.getInstance().getDataSource();
        const ret = await database.query(sql);
        if (Array.isArray(ret[0]))
            return ret[0][0]

        return null;
    }

    protected async delete(table:string, where:any){
        let wh: string = "";

        if(Object.keys(where).length != 0){
            Object.keys(where).forEach((key) => {
                wh += `${key}='${where[key]}' AND `
            })

            wh = `WHERE ${wh.replace(/AND $/,"")}`
        }

        const sql = `DELETE FROM \`${table}\` ${wh}`
        const database = await MysqlManager.getInstance().getDataSource();
        const ret = await database.query<OkPacket>(sql);

        return ret[0].affectedRows > 0
    }


}