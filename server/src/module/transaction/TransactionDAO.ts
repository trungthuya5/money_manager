import {MongoManager} from "../../db/MongoManager";
import {Collection, Db, MongoClient, ObjectId} from "mongodb";
import Transaction from "../../entity/Transaction";

export class TransactionDAO {
    private static instance: TransactionDAO;
    private db?:Db;
    private collection?:Collection;

     constructor() {
    }

    private async  init(collection:string){
    this.db = await MongoManager.getInstance().getDataSource();
    this.collection = await this.db.collection(collection)
    }

    public static getInstance(): TransactionDAO {
        if (!TransactionDAO.instance) {
            TransactionDAO.instance = new TransactionDAO();
        }

        return TransactionDAO.instance;
    }

    public async findAll(userId: number){
         const query = {userId}
         const collection = await MongoManager.getInstance().getCollection("transaction");
         const data = (await collection.find(query).toArray()) as Transaction[];
         return data;
    }

    public async findOne(userId:number, id:string){
         const query = {userId, _id:id}
         const collection = await MongoManager.getInstance().getCollection("transaction");
         return (await collection.findOne(query)) as Transaction;
    }

    public async insertOne(transaction: Transaction){
        console.log("transaction: ", transaction)
        const collection = await MongoManager.getInstance().getCollection("transaction");
        const result = await collection.insertOne(transaction);
        return result
    }

    public async updateOne(transaction:Transaction){
        const query = { _id: new ObjectId(transaction._id) };
        const collection = await MongoManager.getInstance().getCollection("transaction");
        const result = await collection.updateOne(query,{$set:transaction });
        return result;
    }

    public async deleteOne(id:string){
        const query = { _id: new ObjectId(id) };
        const collection = await MongoManager.getInstance().getCollection("transaction");
        const result = await collection.deleteOne(query);
    }


}