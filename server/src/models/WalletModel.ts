import {Model} from "./Model";
import {IWallet, User} from '../entity'

export class WalletModel extends Model {

    private static _instance: WalletModel;
    private table:string = "wallet";

    public static get instance(): WalletModel {
        return this._instance || (this._instance = new this())
    }


    constructor() {
        super()
    }

    public async findFirst(userId: number, id:number) {
        return await  this.find(this.table,{userId, id})
    }

    public async findMany(userId:number) {
        return await this.all(this.table,{userId})
    }

    public async save(data: IWallet) {
        return await this.create(this.table, data)
    }

    public async updateWalletById(userId:number, id: number, data: IWallet) {
        return await this.update(this.table, data, {userId, id})
    }

    public async deleteWalletById(userId:number, id: number) {
        return await this.delete(this.table, {userId, id})
    }
}