export default class Transaction{

     public userId:number;
     public walletId:number;
     public typeId: number;
     public name:string;
     public node:string;
   

    constructor(params:Transaction) {
          this.userId = params.userId;
          this.walletId = params.walletId;
          this.typeId = params.typeId;
          this.name = params.name;
          this.node = params.node;
    }

}