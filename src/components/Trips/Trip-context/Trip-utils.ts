import SplitPaymentCalculator, { type ExpensesType } from "../../../services/SplitPaymentCalculator";
import { TxnListType, TxnType } from "./Trip-types";

export const getConsolidatedExpenses = (txns: TxnListType): ExpensesType => {
    const _txns = txns.reduce((acc, txn) => {
        const friend_id = txn.friend.id;
        const amount = parseFloat(txn.amount.toFixed(2));

        if (acc[friend_id]) {
            acc[friend_id]["amount"] += amount;
        } else {
            acc[friend_id] = { ...txn };
        }

        return acc;
    }, {} as { [key: number]: TxnType });

    return Object.values(_txns);
};


export class Payments {
    private payment: SplitPaymentCalculator;

    constructor(payment: SplitPaymentCalculator) {
        this.payment = payment;
    }

    getTotal() {
        return this.payment.get_total();
    }

    getPayments() {
        return this.payment.get_transactions();
    }
}