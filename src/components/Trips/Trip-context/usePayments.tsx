import React from 'react';
import { useTripContext } from './Trip-context';
import { ComputedTxns } from '../../../services/SplitPaymentCalculator';
import { TxnType } from './Trip-types';

type ReturnType = [
    number | undefined,
    ComputedTxns | undefined,
    TxnType[]
];

const usePayments = (): ReturnType => {
    const [total, setTotal] = React.useState<number>();
    const [transactions, setTransactions] = React.useState<ComputedTxns>();

    const { getPayments, txns: expenses } = useTripContext();

    React.useEffect(() => {
        const payInstance = getPayments();
        const txns = payInstance.getPayments();
        
        setTotal(payInstance.getTotal());
        setTransactions(txns);
    }, [getPayments]);

    return [total, transactions, expenses];
};

export default usePayments;