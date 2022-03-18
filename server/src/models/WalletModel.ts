import {Model} from "./Model";
import {User} from  '../entity'

export class WalletModel extends Model {

    private static _instance: WalletModel;
    private table:string = "wallet";

    public static get instance(): WalletModel {
        return this._instance || (this._instance = new this())
    }


    constructor() {
        super()
    }

    public async findFirst(userId: number) {
        return await  this.findOne(this.table,{userId})
    }

    public async findMany() {
        return await this.findAll(this.table,{})
    }

    public async save(data: User) {
        return await this.insert(this.table, data)
    }

    public async updateById(id: number, data: User) {
        return await this.update(this.table, data, {id})
    }
}