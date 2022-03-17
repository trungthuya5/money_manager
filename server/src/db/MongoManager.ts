// import {AnyError, MongoClient, Db, Collection} from "mongodb"

// export class MongoManager {

//     private url: string = 'mongodb://localhost:27017';
//     private static instance: MongoManager;
//     private dataSource?: Db;

//     constructor() {
//     }

//     public static getInstance(): MongoManager{
//         if(!MongoManager.instance){
//             MongoManager.instance = new MongoManager();
//         }

//         return MongoManager.instance;
//     }

//     public async getDataSource() {

//         if (this.dataSource) {
//             console.log('reusing connection');
//             return this.dataSource;
//         }
//         console.log('connecting');
//         const client = await MongoClient.connect(this.url, {  });
//         this.dataSource = client.db('money');

//         return this.dataSource;
//     }

//     public async getCollection(collection:string){
//         let dataSource = await MongoManager.getInstance().getDataSource();
//         const collection1 = await dataSource.collection(collection);
//         return collection1;
//     }
// }