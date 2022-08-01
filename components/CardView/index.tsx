import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {formatLocalTime} from "@utils/helpers";
import {useMediaQuery} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import {useRef} from "react";

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
    const [expanded, setExpanded] = React.useState(false);
    let imageRender = data?.images?.length > 0 ? data?.images[0] : NOT_FOUND_IMAGE
    const type = imageRender.startsWith('data:image');
    imageRender = type ? decodeURI(imageRender) : imageRender
    const onMediaFallback = (event: any) => event.target.src = NOT_FOUND_IMAGE;

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        }}>
            <CardHeader
                sx={{
                    display: "flex",
                    overflow: "hidden",
                    "& .MuiCardHeader-content": {
                        overflow: "hidden"
                    },
                    "& .MuiTypography-root": {
                        width: matches ? 175 : '100%'
                    }
                }}
                title={loading ? <Skeleton
                  animation="wave"
                  height={10}
                  width="80%"
                  style={{ marginBottom: 6 }}
                />:data?.title}
                titleTypographyProps={{noWrap: true}}
                avatar={
                  loading ? <Skeleton animation="wave" variant="circular" width={40} height={40} /> :
                    <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                        {data?.user?.charAt(0).toUpperCase()}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon/>
                    </IconButton>
                }
                subheader={loading ? <Skeleton
                  animation="wave"
                  height={10}
                  width="80%"
                  style={{ marginBottom: 6 }}
                /> : formatLocalTime(data?.age)}
            />
            {loading ? <Skeleton sx={{ height: matches ? 200 : 350 }} animation="wave" variant="rectangular" /> : <CardMedia
                {...(type ? {src: imageRender} : {src: imageRender})}
                component="img"
                height={matches ? 200 : 350}
                onError={onMediaFallback}
                alt="Paella dish"
                style={{objectFit: 'fill'}}
            />}
            <CardContent>
                <Typography sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "1",
                    WebkitBoxOrient: "vertical",
                }} variant="body2" color="text.secondary">
                    {loading ? <Skeleton /> : (data?.short_description === '' ? 'Not available' : data?.short_description)}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon/>
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon/>
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon/>
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>

                </CardContent>
            </Collapse>
        </Card>
    );
}

export default CardView;
