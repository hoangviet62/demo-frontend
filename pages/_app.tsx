import type {AppProps} from 'next/app'
import Head from "next/head";
import AppBar from "@components/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {createTheme} from "@mui/material";
import {ThemeProvider} from "@mui/system";
// @ts-ignore
import AvanttRegular from "@styles/fonts/Avantt-Regular.woff2";
// @ts-ignore
import AvanttSemiBold from "@styles/fonts/Avantt-SemiBold.woff2";

const theme = createTheme({
    palette: {
        primary: {
            main: '#fe5020'
        }
    },
    typography: {
        fontFamily: "Avantt-Regular",
        h3: {
            fontFamily: "Avantt-SemiBold",
            fontSize: 72,
            fontWeight: 700,
        },
        body2: {
            fontSize: 18,
            fontWeight: 400,
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                "@font-face": [
                    {
                        fontFamily: "Avantt-Regular",
                        src: `url(${AvanttRegular}) format("truetype")`
                    },
                    {
                        fontFamily: "Avantt-SemiBold",
                        src: `url(${AvanttSemiBold}) format("truetype")`
                    }
                ],
            }
        }
    }
});

function MyApp({Component, pageProps}: AppProps) {
    return (<>
        <Head>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
            <title>Demo Frontend</title>
        </Head>
        <ThemeProvider theme={theme}>
            <AppBar/>
            <Box component="main" sx={{p: 3}}>
                <ToastContainer position="bottom-center"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover />
                <Container maxWidth="xl">
                    <Component {...pageProps} />
                </Container>
            </Box>
        </ThemeProvider>
    </>)
}

export default MyApp
