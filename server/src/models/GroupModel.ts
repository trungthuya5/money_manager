
import {Group} from "../entity";
import {Model} from "./Model";

export class GroupModel extends Model{

    private static _instance: GroupModel;

    public static get instance(): GroupModel {
        return this._instance || (this._instance = new this())
    }

    constructor() {
        super();
    }

    public async get(id: number) {
        return await this.selectOne<Group>("SELECT * FROM group WHERE id=?",[id])
    }

    public async getAll(userId: number) {
        return await this.select<Group>("SELECT * FROM group WHERE userId=?",[userId])
    }

    public async save(data:Group) {
        return await this.insert("INSERT INTO group(userId,type,name,des) VALUES (?,?,?,?)",[data.userId,data.type,data.name,data.des])
        // return await prisma.group.create({ data });
    }

    // public async update(userId: number,id:number, data: any) {
    //     return await prisma.group.update({
    //         where: {id},
    //         data: data
    //     });
    // }


    public async getUserByUsername(username: string) {

    }

    public async getUserByLogin(username: string, password: string) {

    }




}