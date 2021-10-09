import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { getPosts } from './actions/posts';

import Posts from './components/Posts/Posts';
import PostDetails from './components/PostDetails/PostDetails';
import Form from './components/Form/Form';
import useStyles from './styles';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';


const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <BrowserRouter>
            <Container maxWidth='xl'>
                <Navbar/>
                <Switch>
                    <Route path='/' exact component={() => <Redirect to="/posts" />}/>
                    <Route path='/posts' exact component={Home}/>
                    <Route path='/posts/search' exact component={Home}/>
                    <Route path='/posts/:id' exact component={PostDetails}/>
                    <Route path='/auth' exact component={() => (!user?<Auth />:<Redirect to="/posts" />)}/>
                </Switch>
            </Container>
        </BrowserRouter>
        
    )
}

export default App;
