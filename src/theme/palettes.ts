const PRIMARY = {
    main: "#212121",
    light: "#484848",
    dark: "#000000",
};

const SECONDARY = {
    light: "#8e8e8e",
    main: "#616161",
    dark: "#373737"
};

const palettes = {
    light: {
        primary: { ...PRIMARY },
        secondary: { ...SECONDARY },
    },
    dark: {
        primary: { ...PRIMARY },
        secondary: { ...SECONDARY },
    },
};

export default palettes;
