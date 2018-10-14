import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import SearchResultsContainer from './components/SearchResultsContainer/SearchResultsContainer';

export default (
    <Switch>
        <Route path="/search/results" component={SearchResultsContainer} />
        <Route path="/" component={Homepage} />
    </Switch>
)