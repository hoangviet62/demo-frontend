import {useRouter} from 'next/router'
import axios from "axios";
import {useEffect, useState} from "react";
import nextConfig from "next/config";
import Typography from "@mui/material/Typography";

const {baseUrl} = nextConfig().publicRuntimeConfig

const Index = ({id, url}: {id:number, url: string}) => {
  const [fetching, setFetching] = useState(false);
  const Router = useRouter();
  const apiUrl = `${baseUrl}/articles/${id}?url=${url}`
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const fetchData = () => {
    setFetching(true);
    axios.get(apiUrl)
    .then(response => {
      setContent(response.data.data.content.join(''))
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
    <Typography variant="h4">{title}</Typography>
    <br/>
    <Typography variant="h6">Author</Typography>
    <Typography variant="h6">Time</Typography>
    <br/>
    <Typography paragraph>{content}</Typography>
  </>)
};

export default Index;
