import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import SearchResultsContainer from './components/SearchResultsContainer/SearchResultsContainer';
import Testimonies from './components/Testimonies/Testimonies'
import Profile from './components/Profile/Profile';

export default (
    <Switch>
        <Route path="/user/profile/:id" component={Profile} />
        <Route path="/restaurant-profile/:id" component={SearchResultsContainer} />
        <Route path="/search/results" component={SearchResultsContainer} />
        <Route exact to path="/" component={Homepage} />
        <Route path="/user/testimonies" component={Testimonies} /> 
    </Switch>
)
