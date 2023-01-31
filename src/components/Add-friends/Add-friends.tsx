import * as React from "react";

import Divider from "@mui/material/Divider";

import AddFriend from "./Add-friend";
import FriendsList from "./Friends-list";

import { useTripContext } from "../Trips/Trip-context/Trip-context";

function AddFriends() {
    const { friends } = useTripContext()

    return (
        <div>
            <AddFriend />

            {friends.length ? <Divider sx={{ my: "1.2rem" }} /> : null}

            <FriendsList />
        </div>
    );
};

export default AddFriends;
