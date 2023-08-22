import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Grid from '@mui/material/Grid';
import MovieCardComponentConnected from ".//movie-card"
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

    const moviesUpdatedColumn = movies && movies.length > 0 ?
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
                                key={`GridItem-item-${new Date().getTime()}-${Math.random()}`} xs={12} sm={6} md={4} lg={3} xl={2}
                            >
                                <MovieCardComponentConnected movie={data} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
        </> : <div>No items to display..</div>

    return (
        <Row >
            {isLoading ?
                (<LoaderComponent isLoading={isLoading} />) : (moviesUpdatedColumn)
            }
        </Row>
    );
}

export default MovieListComponent;
