import {MysqlManager} from "../db";
import {Model} from "./Model";
import {User} from  '../entity'


interface IUser {
    id?: number;
    username: string;
    password: string;
    fullname: string;
}

export class UserModel extends Model {

    private static instance: UserModel;

    public static getInstance(): UserModel {
        if (!UserModel.instance) {
            UserModel.instance = new UserModel();
        }

        return UserModel.instance;
    }

    constructor() {
        super()
    }

    public async get(userId: number) {
        // return await prisma.user.findFirst({
        //     where: {id: userId}
        // });

        // return await this.conn.query("SELECT * FROM user WHERE id=?", [userId]);
    }

    public async getAll() {
        // const user:User[] = await this.conn.query<IUser[]>("SELECT * FROM user");
        //let conn = await MysqlManager.getInstance().getDataSource()
        //return await conn.query("SELECT * FROM user")

        return await this.select("SELECT * FROM user");
        //return  await  prisma.user.findMany();
    }

    public async save(data: User) {
        return await this.insert("INSERT INTO user(username,password,fullname) VALUES(?,?,?)",[data.username,data.password,data.fullname])
       // return await prisma.user.create({data});


    }

    public async update(userId: number, data: User) {

    }


    public async getUserByUsername(username: string) {

        return await this.select("SELECT * FROM user WHERE username=?",[username]);
        // return await prisma.user.count({
        //     where: {username}
        // })
    }

    public async getUserByLogin(username: string, password: string):Promise<User | undefined> {
        return await this.selectOne<User>("SELECT * FROM user WHERE username=? AND password=?",[username,password])
    }


}