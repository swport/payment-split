export type FriendType = {
    id: number;
    name: string;
    initials?: string;
    color?: {
        color: string;
        backgroundColor: string;
    }
};

export type TxnType = {
    id: number;
    friend: FriendType;
    amount: number;
    reason?: string;
};

export type FriendListType = Array<FriendType>;

export type TxnListType = Array<TxnType>;

export type FriendInputType = Omit<FriendType, "id" | "txns">;

export type TxnInputType = Omit<TxnType, "id" | "friend">;

// Functions definitions
export type FnAddFriend = (friend: FriendInputType) => void;
export type FnRemoveFriend = (id: FriendType["id"]) => void;
export type FnUpdateFriendName = (
    id: FriendType["id"],
    name: FriendType["name"]
) => void;
export type FnAddTxn = (friend_id: FriendType["id"], txn: TxnInputType) => void;
export type FnRemoveTxn = (id: TxnType["id"]) => void;