import React, { useContext } from 'react';
import LoadingContext from '../../contexts/LoadingContext';
import './index.css';

const Loader = () => {
    const { loading } = useContext(LoadingContext)

    if (!loading) {
        return null
    }

    return <div className="top-line-loader"/>
}

export default Loader