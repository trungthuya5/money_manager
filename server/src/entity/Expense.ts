export interface IExpense {
    id?: number;
    userId: number;
    walletId: number;
    groupId: number;
    name: string;
    amount: number;
    note: string;
    time?: Date
    created_at?: Date;
    updated_at?: Date;
}