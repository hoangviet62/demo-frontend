import React, {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import CardView from '@components/CardView';
import axios from 'axios'
import nextConfig from 'next/config'
import {toast} from 'react-toastify'
import InfiniteScroll from "react-infinite-scroll-component";
import Typography from "@mui/material/Typography";

const {baseUrl} = nextConfig().publicRuntimeConfig


const Index = () => {
    const [articles, setArticles] = useState<object[]>([])
    const [fetching, setFetching] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const apiUrl = `${baseUrl}/articles?page=${page}`

    const fetchData = () => {
        const failedPage = page;

        setFetching(true);
        axios.get(apiUrl)
            .then(response => {
                const temp = articles.concat(response.data.data)
                setArticles(temp);
                toast.success(`Fetched data from ${response.data.source_from} with page ${page} in ${response.data.duration}`)
            })
            .catch(() => {
                toast.error(`Failed to fetch data with page ${page}`)
            }).then(() => {
            setFetching(false)
            setPage(failedPage)
        })
    }

    useEffect(() => {
        setPage(1)
    }, [])

    useEffect(() => {
        fetchData();
    }, [page])

    const cardViewRendering = () => {
        // @ts-ignore
        return articles.map(article => <Grid key={article?.id} item xl={4} lg={4} md={6} sm={12}>
            <CardView data={article} loading={false}/>
        </Grid>)
    }

    const cardViewSkeletonRendering = () => {
        return (
            <Grid container spacing={3}>
                <Grid key={1} item xl={4} lg={4} md={6} sm={12}>
                    <CardView loading={fetching}/>
                </Grid>
                <Grid key={2} item xl={4} lg={4} md={6} sm={12}>
                    <CardView loading={fetching}/>
                </Grid>
                <Grid key={3} item xl={4} lg={4} md={6} sm={12}>
                    <CardView loading={fetching}/>
                </Grid>
            </Grid>
        )
    }

    const handleLoadMore = () => {
        if (page < 7) setPage(page + 1)
    }

    return (
        <InfiniteScroll
            dataLength={articles.length}
            next={handleLoadMore}
            hasMore={page < 8}
            loader={<Grid container
                          spacing={3}
                          alignItems="stretch"
            >{cardViewSkeletonRendering()}
            </Grid>}
        >
            <Grid container
                  spacing={3}
                  alignItems="stretch"
                  sx={{mb: 3}}
            >
                <Grid item xs={12} mt={5}>
                    <Typography color="primary" variant="h4" align="center" gutterBottom>Hacker News - Top
                        Links</Typography>
                </Grid>
                {cardViewRendering()}
            </Grid>
        </InfiniteScroll>
        // cardViewSkeletonRendering()
    )
}

export default Index
