import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Stack from '@mui/material/Stack';

import PersonIcon from "@mui/icons-material/Person";

import type { SxProps } from "@mui/material";
import { useTripContext } from "../Trips/Trip-context/Trip-context";

const sxInputBox: SxProps = {
    p: "2px 4px",
    mt: "1rem",
    display: "flex",
    alignItems: "center",
    width: "100%"
};

const sxInput: SxProps = {
    ml: 1,
    flexGrow: 1
};

const AddFriend = () => {
    const { friends, addFriend } = useTripContext();
    
    const [name, setName] = React.useState("");
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const reset = () => {
        setName("");
        inputRef.current?.focus();
    };

    const _addFriend = () => {
        const _name = name.toLowerCase();

        if (!_name) return;

        const exists = friends.find((friend) => friend.name.toLowerCase() === _name);

        if (
            !exists ||
            (exists && window.confirm("Name already exist! Continue?"))
        ) {
            addFriend({ name });
            reset();
        }
    };

    const onNameChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const onNameKeyDownEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key.toLowerCase() === "enter") {
            _addFriend();
        }
    };

    const onAddFriendEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
        _addFriend();
    };

    React.useEffect(() => {
        reset();
    }, [friends.length]);

    return (
        <Stack spacing={2}>
            <Paper component="div" sx={sxInputBox} square={true} variant="outlined">
                <IconButton>
                    <PersonIcon />
                </IconButton>
                <InputBase
                    inputRef={inputRef}
                    onChange={onNameChangeEvent}
                    onKeyDown={onNameKeyDownEvent}
                    value={name}
                    sx={sxInput}
                    placeholder="Add friend"
                />
                <Button
                    type="button"
                    onClick={onAddFriendEvent}
                    aria-label="search"
                >
                    <Box fontSize="1.2rem">+</Box>
                </Button>
            </Paper>
        </Stack>
    );
};

export default AddFriend;
