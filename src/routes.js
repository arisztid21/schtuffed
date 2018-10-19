import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import SearchResultsContainer from './components/SearchResultsContainer/SearchResultsContainer';
import Testimonies from './components/Testimonies/Testimonies'
import Shop from './components/Shop/Shop';
import Cart from './components/Shop/Cart';

export default (
    <Switch>
        <Route path="/restaurant-profile/:id" component={SearchResultsContainer} />
        <Route path="/search/results" component={SearchResultsContainer} />
        <Route exact to path="/" component={Homepage} />
        <Route path="/user/testimonies" component={Testimonies} /> 
        <Route path='/Shop' component={Shop}/>
        <Route path='/cart' component={Cart}/>
    </Switch>
)
