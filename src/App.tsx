import * as React from "react";

import styled from "@mui/system/styled";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

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
                        maxWidth="sm"
                        disableGutters={true}
                    >
                        <Content
                            elevation={2}
                            square={true}
                        >
                            <Header />
                            <Trips />
                        </Content>
                    </Container>
                </Wrapper>
            </ThemeProvider>
        </AppProvider>
    );
}

export default App;
