import {
    addFriend,
    addTxn,
    removeTxn,
    removeFriend,
    updateFriendName,
} from "./Trip-reducer-functions";

import type {
    FriendType,
    FriendInputType,
    TxnType,
    TxnInputType,
} from "./Trip-types";

export type State = {
    friends: Array<FriendType>;
    txns: Array<TxnType>;
    currency: string;
};

export type Action =
    | { type: "ADD_FRIEND"; friendInput: FriendInputType }
    | { type: "REMOVE_FRIEND"; friendId: FriendType["id"] }
    | {
          type: "UPDATE_FRIEND";
          friendId: FriendType["id"];
          friendName: FriendType["name"];
      }
    | { type: "ADD_TXN"; friendId: FriendType["id"]; txnInput: TxnInputType }
    | { type: "REMOVE_TXN"; txnId: TxnType["id"] }
    | { type: "UPDATE_TXN"; txnId: TxnType["id"]; amount: TxnType["amount"] }
    | { type: "RESET" }
    | { type: "UPDATE_CURRENCY", currency: string };

export const initialState = {
    friends: [],
    txns: [],
    currency: 'INR'
};

function TripReducer(state: State, action: Action): State {
    switch (action.type) {
        case "ADD_FRIEND":
            action.friendInput.name = action.friendInput.name.trim();
            if (action.friendInput.name === "") {
                return state;
            }
            return {
                ...state,
                ...addFriend(state.friends, state.txns, action.friendInput),
            };

        case "REMOVE_FRIEND":
            return {
                ...state,
                ...removeFriend(state.friends, state.txns, action.friendId),
            };

        case "UPDATE_FRIEND":
            return {
                ...state,
                ...updateFriendName(
                    state.friends,
                    action.friendId,
                    action.friendName
                ),
            };

        case "ADD_TXN":
            return {
                ...state,
                ...addTxn(
                    state.friends,
                    state.txns,
                    action.friendId,
                    action.txnInput
                ),
            };

        case "REMOVE_TXN":
            return {
                ...state,
                ...removeTxn(state.txns, action.txnId),
            };

        case "UPDATE_TXN":
            const updatedTxns = state.txns.map((txn) => {
                if (txn.id === action.txnId) {
                    txn.amount = action.amount;
                }
                return txn;
            });
            return {
                ...state,
                txns: updatedTxns,
            };

        case "RESET":
            return {
                ...initialState,
                currency: state.currency
            };

        case "UPDATE_CURRENCY":
            return {
                ...state,
                currency: action.currency
            };
    }

    return state;
}

export default TripReducer;
