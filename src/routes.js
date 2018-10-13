import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';

export default (
    <Switch>
        <Route path="/" component={Homepage} />
    </Switch>
)