import * as React from "react";

import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import type { SxProps } from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

import Avatar from "@mui/material/Avatar";
import { useTripContext } from "../Trips/Trip-context/Trip-context";

import type { FriendType } from "../Trips/Trip-context/Trip-types";

type IProps = {
    friend: FriendType;
};

const sxAvatar: SxProps = { fontSize: "18px", fontWeight: "400" };

const FriendListItem = ({ friend }: IProps) => {
    const { removeFriend, updateFriendName } = useTripContext();

    const [editing, setEditing] = React.useState(false);
    const [newName, setNewName] = React.useState<string | undefined>();

    React.useEffect(() => {
        const resetEditing = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === "escape") {
                setEditing(false);
            }
        };

        document.addEventListener("keyup", resetEditing);

        return () => {
            document.removeEventListener("keyup", resetEditing);
        };
    }, []);

    const onRemoveFriend = React.useCallback(
        (id: FriendType["id"]) => {
            if (
                window.confirm(
                    "Are you sure? This will remove all transactions as well."
                )
            ) {
                removeFriend(id);
            }
        },
        [removeFriend]
    );

    const editFriend = React.useCallback(() => {
        setEditing(true);
        setNewName(friend.name);
    }, [friend]);

    const updateName = () => {
        if (!newName || newName === "") {
            return alert("Name cannot be empty");
        }

        updateFriendName(friend.id, newName);
        setEditing(false);
    };

    const onKeyDwnName = (e: React.KeyboardEvent) => {
        if (e.key.toLowerCase() === "enter") {
            updateName();
        }
    };

    const onUpdatingName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(e.target.value);
    };

    const onClickingName = () => {
        editFriend();
    };

    const handleClickAway = () => {
        setEditing(false);
    };

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            fontWeight="bold"
        >
            <Box onClick={onClickingName}>
                {editing ? (
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                    >
                        <ClickAwayListener onClickAway={handleClickAway}>
                            <TextField
                                autoFocus
                                autoComplete="false"
                                autoCapitalize="false"
                                autoCorrect="false"
                                value={newName}
                                onKeyDown={onKeyDwnName}
                                onChange={onUpdatingName}
                                size="small"
                            />
                        </ClickAwayListener>
                        <IconButton
                            onClick={updateName}
                            edge="start"
                            aria-label="save"
                            tabIndex={0}
                        >
                            <SaveIcon />
                        </IconButton>
                    </Stack>
                ) : (
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                    >
                        <Avatar
                            sx={{
                                ...sxAvatar,
                                backgroundColor: friend.color?.backgroundColor,
                                color: friend.color?.color
                            }}
                        >
                            {friend.initials}
                        </Avatar>
                        <span>{friend.name}</span>
                    </Stack>
                )}
            </Box>

            <Box>
                <IconButton
                    size="small"
                    onClick={() => onRemoveFriend(friend.id)}
                    aria-label="delete"
                >
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Stack>
    );
};

export default FriendListItem;
