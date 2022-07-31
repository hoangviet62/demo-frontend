import {Head, Html, Main, NextScript} from "next/document";
import React from "react";

export default function Document() {
    return (
        <Html>
            <Head>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
            </Head>
            <body style={{margin: '0 !important', background: '#f2f2f0'}}>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    );
}
