import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop } from '@mui/material';

const LoaderComponent = ({ isLoading, children }) => {
    if (isLoading) {
        return (
            <Backdrop open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }
    // Render nothing if no children present
    return children ? children : null;
}

export default LoaderComponent;
