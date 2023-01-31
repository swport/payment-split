type FriendType = {
    id: number;
    name: string;
};

export type ExpensesType = Array<{
    amount: number;
    friend: FriendType;
}>;

type BinsType = Array<{
    amount: number;
    friend: FriendType;
}>;

type ItemsType = Array<{
    amount: number;
    friend: FriendType;
}>;

export type ComputedTxns = Array<{
    amount: number | string;
    from_friend: FriendType;
    to_friend: FriendType;
}>;

class SplitPaymentCalcClass {
    private expenses: ExpensesType;

    private total: number;

    constructor(expenses: ExpensesType) {
        this.expenses = expenses;
        this.total = this.calculate_total();
    }

    public get_transactions(): ComputedTxns {
        // pool: bins and items (creditors and debtors)
        // bins: creditors to whom pool(debtors) owes money to
        // items: debtors who owe money to the pool(creditors)
        const [bins, items] = this.calculate_bins_and_items();

        // if there's only one debtor to be paid by the pool's creditors
        if (bins.length === 1) {
            const bin = bins[0];

            return items.map((item) => ({
                from_friend: item.friend,
                to_friend: bin.friend,
                amount: item.amount.toFixed(2),
            }));
        }

        const result: ComputedTxns = [];

        items.forEach((item) => {
            let item_amount = item.amount;

            // item goes through every bin to find the best fit
            for (let i = 0, len = bins.length; i < len; i++) {
                const bin = bins[i];

                // item can fit in this bin
                if (+bin.amount.toFixed(1) >= +item_amount.toFixed(1)) {
                    bin.amount -= item_amount; // decrease bin amount
                    result.push({
                        from_friend: item.friend,
                        to_friend: bin.friend,
                        amount: item_amount.toFixed(2),
                    });

                    // we'll move to the next item
                    return;
                }
            }

            // so this item couldn't fit in any bin,
            // we'll distribute it among bins
            bins.forEach((bin) => {
                if (item_amount <= 0 || bin.amount <= 0) return;

                let amount: number;

                // if item is bigger for this bin
                if (+item_amount.toFixed(1) >= +bin.amount.toFixed(1)) {
                    item_amount -= bin.amount;
                    amount = bin.amount;
                } else {
                    bin.amount -= item_amount;
                    amount = item_amount;
                }

                result.push({
                    from_friend: item.friend,
                    to_friend: bin.friend,
                    amount: amount.toFixed(2),
                });
            });
        });

        return result;
    }

    private calculate_bins_and_items(): [BinsType, ItemsType] {
        const total = this.calculate_total();
        const total_people = this.calculate_people();

        const individual_share = total / total_people;

        let bins: BinsType = [];
        let items: ItemsType = [];

        this.expenses.forEach((exp) => {
            if (exp.amount > individual_share) {
                bins.push({
                    friend: exp.friend,
                    amount: exp.amount - individual_share,
                });
            } else if (exp.amount < individual_share) {
                items.push({
                    friend: exp.friend,
                    amount: individual_share - exp.amount,
                });
            }
        });

        return [bins, items];
    }

    private calculate_total(): number {
        return Object.values(this.expenses).reduce(
            (a, expense) => a + expense.amount,
            0
        );
    }

    private calculate_people(): number {
        return this.expenses.length;
    }

    public get_expenses(): ExpensesType {
        return this.expenses;
    }

    public get_total(): number {
        return this.total;
    }
}

export default SplitPaymentCalcClass;
