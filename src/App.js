import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { getPosts } from './actions/posts';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyles from './styles';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';


const App = () => {
    return (
        <BrowserRouter>
            <Container maxidth='lg'>
                <Navbar/>
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path='/auth' exact component={Auth}/>
                </Switch>
            </Container>
        </BrowserRouter>
        
    )
}

export default App;
