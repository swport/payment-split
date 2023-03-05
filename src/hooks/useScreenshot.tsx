import React from "react";
import html2canvas from "html2canvas";

type ReturnType = [string | undefined, (node: HTMLElement) => void, any];

const useScreenshot = (): ReturnType => {
    const [image, setImage] = React.useState<string>();
    const [error, setError] = React.useState<any>();

    const takeScreenShot = React.useCallback((node: HTMLElement) => {
        html2canvas(node)
            .then((canvas) => {
                const croppedCanvas = document.createElement("canvas");
                const croppedCanvasContext = croppedCanvas.getContext("2d")!;
                // init data
                const cropPositionTop = 0;
                const cropPositionLeft = 0;
                const cropWidth = canvas.width;
                const cropHeight = canvas.height;

                croppedCanvas.width = cropWidth;
                croppedCanvas.height = cropHeight;

                croppedCanvasContext.drawImage(
                    canvas,
                    cropPositionLeft,
                    cropPositionTop
                );

                const base64Image = croppedCanvas.toDataURL("image/png", 1);

                setImage(base64Image);
                return true;
            })
            .catch((e) => {
                setError(e);
            });

        return true;
    }, []);

    return [image, takeScreenShot, error];
};

export default useScreenshot;
