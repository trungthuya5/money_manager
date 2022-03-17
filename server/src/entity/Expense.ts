import { group } from "console"
import Group from "./Group"
import User from "./User"
import { Wallet } from "./Wallet"

  export interface Expense{
      id?:number;
      userId:number;
      walletId: number;
      groupId: number;
      name:string;
      amount:number;
      des:string;
      user:User;
      wallet:Wallet;
      group:Group
      createdAt: Date;
      updatedAt: Date;
  }