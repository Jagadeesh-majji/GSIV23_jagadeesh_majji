import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openMovieModal } from '../movie-browser/movie-modal/movie-modal.actions'

const styles = {

    card: {
        cursor: 'pointer',
        height: 250,

    },
    description: {
        display: 'inline',
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        WebkitLineClamp: 2, // Display only two lines
        marginBottom: 0,
        fontSize: '0.8rem'

    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
    },
    title: {
        fontSize: '0.8rem',
        fontWeight: 600,
        paddingRight: '0.1rem',
        boxSizing: "border-box"
    }

};
function MovieCardComponent(props) {
    const { movie } = props;
    const navigate = useNavigate();
    return (
        <Card sx={styles.card}
            onClick={() => {
                openMovieModal(movie.id);
                navigate(`/description/${movie.id}`);
            }}
        >
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="150"
                    image={movie.poster_path}
                    alt={movie.title}
                />
                <CardContent>
                    <div style={styles.header}>
                        <Typography variant="p" gutterBottom style={styles.title}>
                            {movie.title}
                        </Typography>
                        <div style={styles.ratingContainer}>
                            <Typography variant="body2" color="textSecondary">
                                {movie.vote_average}
                            </Typography>
                        </div>
                    </div>
                    <Typography variant="body2" color="textSecondary" noWrap={true} component="div" >
                        <p style={styles.description}>
                            {movie.overview}
                        </p>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default connect(
    () => ({}),
    { openMovieModal }
)(MovieCardComponent);