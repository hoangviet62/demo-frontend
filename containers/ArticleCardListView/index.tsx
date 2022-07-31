import React, {useEffect, useState} from "react";
import type {NextComponentType} from 'next'
import {Grid} from "@mui/material";
import CardView from '@components/CardView';
import Typography from "@mui/material/Typography";
import axios from 'axios'
import nextConfig from 'next/config'

const {baseUrl} = nextConfig().publicRuntimeConfig


const Index: NextComponentType = () => {
    const [articles, setArticles] = useState<object[]>([])
    const [fetching, setFetching] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const apiUrl = `${baseUrl}/articles?page=${page}`

    useEffect(() => {
        setFetching(true);
        axios.get(apiUrl)
            .then(response => {
                setArticles(response.data.data);
            })
            .catch(() => undefined).then(() => {
            setFetching(false)
        })
    }, [])

    const cardViewRendering = () => {
        // @ts-ignore
        return articles.map(article => <Grid key={article?.id} item xl={4} lg={4} md={6} sm={12}>
            <CardView data={article}/>
        </Grid>)
    }

    return (
        <Grid container
              spacing={3}
              alignItems="stretch"
        >
            <Grid item xs={12} mt={5}>
                <Typography variant="h3" align="center" gutterBottom>List Items</Typography>
            </Grid>
            {cardViewRendering()}
        </Grid>
    )
}

export default Index
