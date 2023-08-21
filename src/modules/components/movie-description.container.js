import React from 'react';
import { connect, useSelector } from 'react-redux';
import _ from 'lodash';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import * as movieActions from '../movie-browser/movie-browser.actions';
import Loader from '../common/loader.component';
import DescriptionAppBar from './movie-description.appbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const styles = {

    card: {
        width: '100%',
        marginTop: 2,
        boxSizing: 'border-box'

    },
    cardContainer: {
        display: 'flex',
    },
    image: {
        width: '25%',
    },
    content: {
        flex: 1,

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: '0.5rem'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        margin: '0.5rem'
    },
    year: {
        paddingRight: "0.4rem",
        borderRight: '0.2rem solid #000',
        borderRadius: '0.1rem'
    },
    runtime: {
        paddingLeft: "0.4rem",
    },
    descriptionTitle: {
        fontWeight: 600,
        paddingRight: '0.2rem'
    },
    title: {
        fontSize: '0.9rem',
        marginRight: '0.4rem',
        fontWeight: 600
    },
    ratingContainer: {
        background: '#f5f5f5',
        padding: 0.5,
        borderRadius: 1,
    },
    description: {
        fontSize: '0.9rem',
        whiteSpace: "pre-wrap",
        margin: '0.4rem'
    },
}
const MovieDescriptionComponentConnected = (props) => {
    const TMDB_IMAGE_BASE_URL = (width = 500) => `https://image.tmdb.org/t/p/w${width}`;
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();
    const valueInState = useSelector(state => state);


    const location = useLocation();
    React.useEffect(() => {
        let movieid = location.pathname.split("/description/")[1];
        if (movieid) {
            props.getMovieDetails(movieid);
        } else {
            navigate("/");
        }
    }, []);
    React.useEffect(() => {
        if (valueInState?.movieBrowser?.movieDetails?.response) {
            setLoading(false);
        } else {
        }
    }, [valueInState]);
    return (
        <>
            <DescriptionAppBar onHomeClick={() => navigate("/")} />
            <Loader isLoading={loading}>

                <Card sx={styles.card}>
                    <CardActionArea>
                        <div style={styles.cardContainer}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={`${TMDB_IMAGE_BASE_URL()}${valueInState.movieBrowser.movieDetails.response?.backdrop_path}`}
                                alt={valueInState.movieBrowser.movieDetails.response?.title}
                                style={styles.image}
                            />
                            <CardContent style={styles.content}>
                                <div style={styles.header}>
                                    <Typography variant="p" style={styles.title}>
                                        {valueInState.movieBrowser.movieDetails.response?.title}
                                    </Typography>
                                    <div style={styles.ratingContainer}>
                                        <Typography variant="body2" color="textSecondary">
                                            {valueInState.movieBrowser.movieDetails.response?.vote_average}
                                        </Typography>
                                    </div>
                                </div>
                                <div style={styles.header}>
                                    <Typography variant="p" style={styles.year}>
                                        {new Date(valueInState.movieBrowser.movieDetails.response?.release_date).getFullYear()}
                                    </Typography>
                                    <Typography variant="p" style={styles.runtime}>
                                        {`${valueInState.movieBrowser.movieDetails.response?.runtime} min`}
                                    </Typography>
                                </div>
                                <Typography variant="body2" color="textSecondary" noWrap component="div">
                                    <p style={styles.description}>
                                        <span style={styles.descriptionTitle}>Description: </span>{valueInState.movieBrowser.movieDetails.response?.overview}
                                    </p>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" noWrap component="div" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }} onClick={() => navigate("/")}>
                                    <ArrowBackIcon style={{ marginRight: '4px' }} />
                                    <span> Click  here to go back</span>
                                </Typography>
                            </CardContent>
                        </div>
                    </CardActionArea>
                </Card>
            </Loader>
        </>
    )
}



export default connect(
    (state) => ({
        topMovies: state.movieBrowser.topMovies
    }),
    { ...movieActions }
)(MovieDescriptionComponentConnected);
