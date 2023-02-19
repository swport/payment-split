import React from "react";
import { numToPrice } from "../../../utis/helpers";

import TripReducer, { State, initialState } from "./Trip-reducer";
import type {
    FriendType,
    FriendInputType,
    TxnType,
    TxnInputType,
} from "./Trip-types";

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
    toPrice: (price: number | string) => string;
}

const TripContext = React.createContext<TripProviderState | undefined>(
    undefined
);

TripContext.displayName = "TripContext";

type IProps = {
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

    const toPrice = React.useCallback((price: number | string) => {
        return numToPrice(price, state.currency);
    }, [state.currency]);

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
            toPrice
        }),
        [state, toPrice]
    );

    return (
        <TripContext.Provider value={value} {...props} />
    );
}

export default TripProvider;
