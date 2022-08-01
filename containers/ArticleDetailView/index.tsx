import {useRouter} from 'next/router'
import axios from "axios";
import {useEffect, useState} from "react";
import nextConfig from "next/config";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from "@mui/material/IconButton";
import {Grid} from "@mui/material";

const {baseUrl} = nextConfig().publicRuntimeConfig

const Index = ({id, url}: { id: number, url: string }) => {
    const [fetching, setFetching] = useState(false);
    const Router = useRouter();
    const apiUrl = `${baseUrl}/articles/${id}?url=${url}`
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const randomNumber = (maxNum: number) => Math.floor(Math.random() * maxNum)

    const fetchData = () => {
        setFetching(true);
        axios.get(apiUrl)
            .then(response => {
                let listContent = response.data.data.content
                const listImages = response.data.data.images
                listImages.forEach((image: any) => {
                    listContent.splice(randomNumber(listContent.length), 0, `<div style="width: 100%; text-align: center"><img style="width: 100%;
  height: auto;" src=${image} /></div>`);
                })
                setContent(listContent.join(''))
                setTitle(response.data.data.title)
            })
            .catch(() => {
            }).then(() => {
            setFetching(false)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (<>
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <IconButton aria-label="back" color="primary" onClick={() => {
                    Router.back()
                }}>
                    <ArrowBackIcon/>
                </IconButton>
            </Grid>
            <Grid item xs={12}>&nbsp;</Grid>
            <Grid item xs={12}>
                <Typography variant="h4" color="primary" gutterBottom>{title}</Typography>
            </Grid>
            <Grid item xs={12}>
                <div dangerouslySetInnerHTML={{__html: content}}/>
            </Grid>
        </Grid>
    </>)
};

export default Index;
