import Group from "./Group"
import User from "./User"
import { Wallet } from "./Wallet"

export interface Income{
    id: number
    userId: number
    user: User
    walletId: number
    wallet: Wallet
    groupId: number
    group: Group
    name: string
    amount: number
    des: string
    createdAt: Date
    updatedAt: Date
}