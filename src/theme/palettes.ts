const PRIMARY = {
  light: '#757ce8',
  main: '#3f50b5',
  dark: '#002884',
  contrastText: '#fff',
};

const SECONDARY = {
  light: '#ff7961',
  main: '#f44336',
  dark: '#ba000d',
  contrastText: '#000',
};

const palettes = {
  light: {
    primary: { ...PRIMARY, contrastText: "#fff" },
    secondary: { ...SECONDARY, contrastText: "#fff" }
  },
  dark: {
    primary: { ...PRIMARY, contrastText: "#fff" },
    secondary: { ...SECONDARY, contrastText: "#fff" }
  },
};

export default palettes;
