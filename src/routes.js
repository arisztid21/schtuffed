import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import SearchResultsContainer from './components/SearchResultsContainer/SearchResultsContainer';
import Testimonies from './components/Testimonies/Testimonies'

export default (
    <Switch>
        <Route path="/restaurants/:id" component={SearchResultsContainer} />
        <Route path="/search/results" component={SearchResultsContainer} />
        <Route exact to path="/" component={Homepage} />
        <Route path="/testimonies" component={Testimonies} /> 

    </Switch>
)
