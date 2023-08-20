const movieBrowserReducer = combineReducers({
    movieModal: movieModalReducer,
    topMovies: createAsyncReducer(movieActionKeys.GET_TOP_MOVIES, {
      [`${movieActionKeys.GET_TOP_MOVIES}_SUCCESS`]: moviesSuccessReducer
    }),
    movieSearch: createAsyncReducer(movieActionKeys.SEARCH_MOVIES, {
      [`${movieActionKeys.SEARCH_MOVIES}_SUCCESS`]: moviesSuccessReducer
    }),
    movieDetails: createAsyncReducer(movieActionKeys.GET_MOVIE_DETAILS),
  });
  