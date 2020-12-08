


export interface TransactionHistory {
month: string;
total: string;
transactions: Transaction[];
}

export interface Transaction {
transactionType: string;
status: string;
customerId: string;
transactionReference: string;
transactionAmount: string;
id: string;
createDate: string;
flag: string;
isoName: string;
currencySymbol: string;
callingCodes: string;
}
