import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { useLocation } from 'react-router-dom';
import * as movieActions from '../movie-browser.actions';
import Loader from '../../common/loader.component';

const MovieDescriptionComponentConnected = (props) => {
    const [movieDetails, setMovieDetails] = React.useState();
    const dispatch = useDispatch();
    const valueInState = useSelector(state => state);


    const location = useLocation();
    React.useEffect(() => {
        // setIsLoading(true);
        let movieid = location.pathname.split("/description/")[1];
        props.getMovieDetails(movieid);
    }, []);
    React.useEffect(() => {
        if (valueInState?.movieBrowser?.movieDetails?.response) {
            setMovieDetails(valueInState.movieBrowser.movieDetails.response);
            console.log(valueInState.movieBrowser.movieDetails.response);
        } else {
        }
    }, [valueInState]);
    return <div>
        <Loader isLoading={!!movieDetails}>
            visible div
        </Loader>
    </div>
}



export default connect(
    // Map nodes in our state to a properties of our component
    (state) => ({
        topMovies: state.movieBrowser.topMovies
    }),
    // Map action creators to properties of our component
    { ...movieActions }
)(MovieDescriptionComponentConnected);
