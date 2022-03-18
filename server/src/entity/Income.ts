export interface IIncome{
    id: number
    userId: number
    walletId: number
    groupId: number
    amount: number
    note?: string
    time:Date
    created_at?: Date
    updated_at?: Date
}