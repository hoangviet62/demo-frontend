import type {AppProps} from 'next/app'
import Head from "next/head";
import AppBar from "@components/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({Component, pageProps}: AppProps) {
    return (<>
        <Head>
            <title>Demo Frontend</title>
        </Head>
        <AppBar/>
        <Box component="main" sx={{p: 3}}>
            <ToastContainer position="top-right"
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
    </>)
}

export default MyApp
