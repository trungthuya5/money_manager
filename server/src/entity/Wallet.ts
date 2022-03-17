// export default class Wallet{
//     constructor(
//         public name:string,
//         public amount: number,
//     ) {
//     }
// }

import { Expense } from "./Expense"
import { Income } from "./Income"
import User from "./User"


export interface Wallet {
     id: number
     userId: number
     user: User
     name: string
     amount: number
     createdAt: Date
     updatedAt: Date
     income: Income[]
     expense: Expense[]
}