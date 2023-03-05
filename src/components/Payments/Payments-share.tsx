import React from "react";

import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from '@mui/icons-material/Download';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import { SxProps } from "@mui/material";

import ScreenShot from "./Payment-screenshot";
import { downloadBlobFile, randomId } from "../../utils/helpers";

type IProps = {
    isOpen: boolean;
    closeModal: () => void;
};

const sxDialogBox: SxProps = {
    "& .MuiDialog-container": {
        alignItems: "flex-start",
    },
};

const PaymentsShare: React.FC<IProps> = ({ isOpen, closeModal }) => {
    const [imageUrl, setImageUrl] = React.useState<string>();
    
    const [downloading, setDownloading] = React.useState(false);

    const handleDownloadImage = (e: React.MouseEvent) => {
        e.preventDefault();

        if(!imageUrl) return;

        // convert base64 to blob
        fetch(imageUrl)
            .then(async (response) => {
                try {
                    const blob = await response.blob();
                    const filename = `final-txns-${randomId()}.png`;
                    downloadBlobFile(blob, filename);
                    setDownloading(false);
                } catch(e) {
                    console.log(e);
                    alert("Error occured while downloading image. Please refresh page and try again.");
                    setDownloading(false);
                    return false;
                }
                
            });

        setDownloading(true);
    };

    return (
        <Dialog
            open={isOpen}
            onClose={closeModal}
            sx={sxDialogBox}
            scroll="paper"
        >
            <DialogTitle>
                {imageUrl && (
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <IconButton onClick={handleDownloadImage} disabled={downloading}>
                            <DownloadIcon />
                        </IconButton>
                        <IconButton disabled={true}>
                            <WhatsAppIcon />
                        </IconButton>
                        <IconButton disabled={true}>
                            <FacebookIcon />
                        </IconButton>
                    </Box>
                )}
            </DialogTitle>
            <DialogContent dividers={true}>
                <Box marginBottom="12px">
                    <ScreenShot setImageUrl={setImageUrl} />
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default PaymentsShare;
