import React from "react";
import { numToPrice } from "../../../utils/helpers";

import TripReducer, { State, initialState } from "./Trip-reducer";
import type {
    FriendType,
    FriendInputType,
    TxnType,
    TxnInputType,
} from "./Trip-types";
import SplitPaymentCalculator from "../../../services/SplitPaymentCalculator";
import { getConsolidatedExpenses, Payments } from "./Trip-utils";

interface TripProviderState extends State {
    addFriend: (friendInput: FriendInputType) => void;
    removeFriend: (friendId: FriendType["id"]) => void;
    updateFriendName: (
        friendId: FriendType["id"],
        friendName: FriendType["name"]
    ) => void;
    addTxn: (friendId: FriendType["id"], txnInput: TxnInputType) => void;
    updateTxn: (txnId: TxnType["id"], amount: TxnType["amount"]) => void;
    removeTxn: (txnId: TxnType["id"]) => void;
    reset: () => void;
    changeCurrency: (currency: string) => void;
    toPrice: (price: number | string) => string;
    getPayments: () => Payments;
}

const TripContext = React.createContext<TripProviderState | undefined>(
    undefined
);

TripContext.displayName = "TripContext";

type IProps = {
    tripid: number;
    children: React.ReactNode;
};

export const useTripContext = () => {
    const context = React.useContext(TripContext);
    if (context === undefined) {
        throw new Error("useTripsContext must be used within a TripProvider");
    }
    return context;
};

function TripProvider(props: IProps) {
    const [state, dispatch] = React.useReducer(TripReducer, initialState);
    const isMounted = React.useRef(false);
    const memoizedPayments = React.useRef<Payments>();

    const addFriend = (friendInput: FriendInputType) =>
        dispatch({ type: "ADD_FRIEND", friendInput });

    const removeFriend = (friendId: FriendType["id"]) =>
        dispatch({ type: "REMOVE_FRIEND", friendId });

    const updateFriendName = (
        friendId: FriendType["id"],
        friendName: FriendType["name"]
    ) => dispatch({ type: "UPDATE_FRIEND", friendId, friendName });

    const addTxn = (friendId: FriendType["id"], txnInput: TxnInputType) =>
        dispatch({ type: "ADD_TXN", friendId, txnInput });

    const updateTxn = (txnId: TxnType["id"], amount: TxnType["amount"]) =>
        dispatch({ type: "UPDATE_TXN", txnId, amount });

    const removeTxn = (txnId: TxnType["id"]) =>
        dispatch({ type: "REMOVE_TXN", txnId });

    const reset = () => dispatch({ type: "RESET" });

    const changeCurrency = (currency: string) =>
        dispatch({ type: "UPDATE_CURRENCY", currency });

    const toPrice = React.useCallback(
        (price: number | string) => {
            return numToPrice(price, state.currency);
        },
        [state.currency]
    );

    React.useEffect(() => {
        memoizedPayments.current = undefined;
    }, [state.txns]);

    const getPayments = React.useCallback(() => {
        if( !memoizedPayments.current ) {
            const payments = new SplitPaymentCalculator(
                getConsolidatedExpenses(state.txns)
            );
            memoizedPayments.current = new Payments(payments);
        }
        return memoizedPayments.current;
    }, [state.txns]);

    const value = React.useMemo(
        () => ({
            ...state,
            addFriend,
            removeFriend,
            updateFriendName,
            addTxn,
            updateTxn,
            removeTxn,
            reset,
            changeCurrency,
            toPrice,
            getPayments
        }),
        [state, toPrice, getPayments]
    );

    const tripid = props.tripid;

    React.useEffect(() => {
        try {
            const lsState = localStorage.getItem(`trip-${tripid}`);
            if (lsState) {
                const savedState = JSON.parse(lsState) as State;
                dispatch({ type: "ENTIRE_STATE", state: savedState });
                return;
            }
        } catch (e) {
            console.log(e);
        }

        isMounted.current = true;
    }, [tripid]);

    React.useEffect(() => {
        if (isMounted.current) {
            // TODO: ignore on first hydrate
            localStorage.setItem(`trip-${tripid}`, JSON.stringify(state));
        } else {
            isMounted.current = true;
        }
    }, [state, tripid]);

    return (
        <TripContext.Provider
            value={value}
            {...props}
        />
    );
}

export default TripProvider;
