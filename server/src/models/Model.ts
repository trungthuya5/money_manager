import {MysqlManager} from "../db";

export class Model {

    public async count(sql: string, options?: unknown) {
        const ret = await MysqlManager.getInstance().getDataSource().query(sql, options);
        return <Number><unknown>ret[0]
    }

    public async insert(table: string, data: any) {
        let field = '';
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

    public async update(table: string, data: any, where: any) {

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
        const ret = await database.query(sql);
        return ret
    }

    public async findAll(table: string, where: any) {

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

    public async findOne(table: string, where: any) {

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


}