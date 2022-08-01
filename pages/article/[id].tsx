import * as React from "react";
import Page from "@containers/ArticleDetailView"

const Index = ({recordId, url}: { recordId: number, url: string }) => {
    return <Page id={recordId} url={url}/>
}

Index.getInitialProps = async (ctx: any) => {
    return {recordId: ctx.query.id, url: ctx.query.url}
}

export default Index
