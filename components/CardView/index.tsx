import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CommentIcon from '@mui/icons-material/Comment';
import {useMediaQuery} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import {useRouter} from 'next/router';
import PeopleIcon from '@mui/icons-material/People';
import {formatLocalTime} from "@utils/helpers";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const {expand, ...other} = props;
    return <IconButton disabled {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const NOT_FOUND_IMAGE = '/not_found.png'

const CardView = ({data, loading}: { data?: any, loading?: boolean }) => {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const [expanded,] = React.useState(false);
    let imageRender = data?.images?.length > 0 ? data?.images[0] : NOT_FOUND_IMAGE
    const type = imageRender.startsWith('data:image');
    imageRender = type ? decodeURI(imageRender) : imageRender
    const onMediaFallback = (event: any) => event.target.src = NOT_FOUND_IMAGE;
    const Router = useRouter();

    return (
        <a style={{cursor: 'pointer', textDecoration: 'none'}}
           onClick={() => Router.push(`/article/${data?.id}?url=${data.url}`)}>
            <Card sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
            }} elevation={3}>
                {loading ? <Skeleton sx={{height: matches ? 200 : 350}} animation="wave" variant="rectangular"/> :
                    <CardMedia
                        {...(type ? {src: imageRender} : {src: imageRender})}
                        component="img"
                        height={matches ? 200 : 350}
                        onError={onMediaFallback}
                        alt="Paella dish"
                        style={{objectFit: 'fill'}}
                    />}
                <CardContent>
                    <Typography sx={{
                        // overflow: "hidden",
                        // textOverflow: "ellipsis",
                        // display: "-webkit-box",
                        // WebkitLineClamp: "1",
                        // WebkitBoxOrient: "vertical",
                        fontWeight: 600,
                        // width: matches ? 300 : '100%',
                    }} variant="h6" color="text.secondary">
                        {loading ?
                            <Skeleton/> : data?.title}
                    </Typography>
                    <Typography sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                    }} variant="body2" color="text.secondary">
                        {loading ?
                            <Skeleton/> : (data?.short_description === '' ? 'Not available' : data?.short_description)}
                    </Typography>
                </CardContent>
                <div style={{flexGrow: 1}}/>
                <CardActions disableSpacing sx={{
                    justifyContent: 'space-between',
                    display: matches ? 'inline-block' : 'flex'
                }}>
                    <IconButton aria-label="points">
                        <ScoreboardIcon/> &nbsp; <Typography variant="caption">{loading ?
                        <Skeleton/> : data?.score}</Typography>
                    </IconButton>
                    <IconButton aria-label="user">
                        <PeopleIcon/> &nbsp; <Typography variant="caption">{loading ?
                        <Skeleton/> : data?.user}</Typography>
                    </IconButton>
                    <IconButton aria-label="share">
                        <CommentIcon/> &nbsp; <Typography variant="caption">{loading ?
                        <Skeleton/> : data?.comment}</Typography>
                    </IconButton>
                    <IconButton aria-label="share">
                        <AccessTimeIcon/> &nbsp; <Typography variant="caption">{loading ?
                        <Skeleton/> : formatLocalTime(data?.age)}</Typography>
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent/>
                </Collapse>
            </Card>
        </a>
    );
}

export default CardView;
