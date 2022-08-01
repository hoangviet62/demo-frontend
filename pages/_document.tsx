import {Head, Html, Main, NextScript} from "next/document";
import React from "react";

export default function Document() {
    return (
        <Html>
            <Head>
              {/*  <link*/}
              {/*    rel="preload"*/}
              {/*    href="/fonts/Avantt-Medium.woff2"*/}
              {/*    as="font"*/}
              {/*    type="font/woff2"*/}
              {/*    crossOrigin="anonymous"*/}
              {/*  />*/}
              {/*<link*/}
              {/*  rel="preload"*/}
              {/*  href="/fonts/Avantt-Regular.woff2"*/}
              {/*  as="font"*/}
              {/*  type="font/woff2"*/}
              {/*  crossOrigin="anonymous"*/}
              {/*/>*/}
              {/*<link*/}
              {/*  rel="preload"*/}
              {/*  href="/fonts/Avantt-SemiBold.woff2"*/}
              {/*  as="font"*/}
              {/*  type="font/woff2"*/}
              {/*  crossOrigin="anonymous"*/}
              {/*/>*/}
            </Head>
            <body style={{margin: '0 !important', background: '#f2f2f0'}}>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    );
}
