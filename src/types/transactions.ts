export interface TransactionDTO {
    value: number
    description: string
    type: 'Deposito' | 'Saque';
    data: Date
}

export interface TransactionState {
    transactions: TransactionDTO[]
    totalAmount: number;
}