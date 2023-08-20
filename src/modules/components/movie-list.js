import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
// import Container from '@mui/material';
// import MovieCard from '../movie-card/movie-card.component';
import MovieCardComponentConnected from ".//movie-card"
//import LoaderComponent from '../loader.component';
import LoaderComponent from '../common/loader.component';

const styles = {
    movieColumn: {
        marginBottom: 20
    },
    container: {
        padding: '1.4rem', // Adjust as needed
    },
}
const MovieListComponent = ({ movies, isLoading }) => {


    const moviesUpdatedColumn = movies ?
        <>
            <Container className={"grid-container"} maxWidth="xl" style={styles.container}>
                <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="stretch"
                    spacing={2}
                >
                    {
                        movies.map(data => (
                            <Grid item
                                key={`GridItem-${data.title}`} xs={12} sm={6} md={4} lg={3} xl={2}
                            >
                                <MovieCardComponentConnected movie={data} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
        </> : null;

    return (
        <Row >
            {moviesUpdatedColumn}
            <LoaderComponent isLoading={isLoading} />
        </Row>
    );
}

export default MovieListComponent;
