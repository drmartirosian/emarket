import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/container/Home/Home';
import About from './components/container/About/About';
import Cart from './components/container/Cart/Cart';
import Admin from './components/container/Admin/Admin';

export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
        <Route path='/cart' component={Cart} />
        <Route path='/admin' component={Admin} />
    </Switch>
)
