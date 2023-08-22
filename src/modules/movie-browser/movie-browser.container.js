import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { AppBar, TextField, RaisedButton } from '@mui/material';
import * as movieActions from './movie-browser.actions';
import * as movieHelpers from './movie-browser.helpers';
import MovieList from './movie-list/movie-list.component';
import MovieListComponent from '../components/movie-list';
import * as scrollHelpers from '../common/scroll.helpers';
import MovieModal from './movie-modal/movie-modal.container';
import PrimarySearchAppBar from '../components/movie-appbar'

class MovieBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            currentMovies: [],
        };
        // Binds the handleScroll to this class (MovieBrowser)
        // which provides access to MovieBrowser's props
        // Note: You don't have to do this if you call a method
        // directly from a lifecycle method
        this.handleScroll = this.handleScroll.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    componentDidMount() {
        window.onscroll = this.handleScroll;
        this.props.getTopMovies(this.state.currentPage);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }


    handleScroll() {
        const { topMovies } = this.props;
        if (!topMovies.isLoading) {
            let percentageScrolled = scrollHelpers.getPercentageScrolledDown(window);
            if (percentageScrolled > .8) {
                const nextPage = this.state.currentPage + 1;
                this.props.getTopMovies(nextPage);
                this.setState({ currentPage: nextPage });
            }
        }
    }
    onSearchChange(e) {
        this.props.searchMovies(e.target.value, this.state.currentPage);
    }


    render() {
        const { movieSearch, topMovies } = this.props;


        let movies = (movieSearch?.response?.results || []).length > 0 ? movieHelpers.getMoviesList(movieSearch.response) : movieHelpers.getMoviesList(topMovies.response);
        return (
            <div>
                <PrimarySearchAppBar onSearchChange={this.onSearchChange} inputSearchValue={this.state.searchValue} />
                <Container>
                    <Row>
                        <MovieListComponent movies={movies} isLoading={this.props.topMovies.isLoading} />
                    </Row>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    topMovies: state.movieBrowser.topMovies,
    movieSearch: state.movieBrowser.movieSearch
});

export default connect(
    mapStateToProps,
    { ...movieActions }
)(MovieBrowser);