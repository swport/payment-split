import * as React from "react";

import styled from "@mui/system/styled";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Header from "./components/Header";
import Trips from "./components/Trips/Trips";
import ThemeProvider from "./theme";

import AppProvider from "./App-context";

const Wrapper = styled("div")(({ theme }) => ({
    width: "100%",
    height: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
}));

const Content = styled(Paper)(({ theme }) => ({
    marginTop: "1rem"
}));

function App() {
    // React.useEffect(() => {
    //     window.onbeforeunload = function() {
    //       return "Data will be lost if you leave the page, are you sure?";
    //     };
    // }, []);

    return (
        <AppProvider>
            <ThemeProvider>
                <Wrapper>
                    <Container
                        data-testid="RenderedApp"
                        maxWidth="sm"
                        disableGutters={true}
                    >
                        <Box marginY="0.5rem">
                            <Typography variant="h1" fontSize="1.6rem" fontWeight="bold">
                                SplitEase
                            </Typography>
                            <Typography variant="body2">Split expenses among your friends with ease</Typography>
                        </Box>
                        <Content
                            elevation={2}
                            square={true}
                        >
                            <Header />
                            <Trips />
                        </Content>
                        <Box margin="0.15rem" textAlign="right">
                            <Typography variant="body2">Made with love by <a href="https://github.com/swport" target="_blank">Sumit Wadhwa</a></Typography>
                        </Box>
                    </Container>
                </Wrapper>
            </ThemeProvider>
        </AppProvider>
    );
}

export default App;
