import React, {useEffect, useState} from "react";
import {Grid, useMediaQuery} from "@mui/material";
import CardView from '@components/CardView';
import axios from 'axios'
import nextConfig from 'next/config'
import {toast} from 'react-toastify'
import InfiniteScroll from "react-infinite-scroll-component";
import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/material/styles";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
const {baseUrl} = nextConfig().publicRuntimeConfig


const ArticleView = () => {
    const [articles, setArticles] = useState<object[]>([])
    const [, setFetching] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const apiUrl = `${baseUrl}/articles?page=${page}`
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    const fetchData = () => {
        const failedPage = page;

        setFetching(true);
        axios.get(apiUrl)
            .then(response => {
                const temp = articles.concat(response.data.data)
                setArticles(temp);
                // toast.success(`Fetched data from ${response.data.source_from} with page ${page} in ${response.data.duration}`)
            })
            .catch(() => {
                toast.error(`Failed to fetch data with page ${page}`)
            }).then(() => {
            setFetching(true)
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
        return articles.map(article => <Grid key={`${article?.id}_${(Math.random() + 1).toString(36).substring(7)}`} item xl={4} lg={4} md={6} sm={12}>
            <CardView data={article} loading={false}/>
        </Grid>)
    }

    const handleLoadMore = () => {
        if (page < 7) setPage(page + 1)
    }

    return (
      <div>
          <Typography color="primary" variant="h4" align="center" gutterBottom>Hacker News { !matches && '- Top Links' }</Typography>
            <InfiniteScroll
                style={{overflow:'hidden'}}
                dataLength={articles.length}
                next={handleLoadMore}
                hasMore={page < 8}
                loader={<Box sx={{ display: 'flex',
                    justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>}
            >
                <Grid container
                      spacing={3}
                      alignItems="stretch"
                      sx={{mb: 3}}
                >
                    {cardViewRendering()}
                </Grid>
            </InfiniteScroll>
      </div>
    )
}

export default ArticleView;
