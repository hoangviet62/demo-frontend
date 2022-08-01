import * as React from "react";
import Page from "@containers/ArticleDetailView"

const Index = ({id, url}: {id: number, url: string}) => {
  return <Page id={id} url={url} />
}

Index.getInitialProps = async (ctx: any) => {
  return { id: ctx.query.id, url: ctx.query.url }
}

export default Index
