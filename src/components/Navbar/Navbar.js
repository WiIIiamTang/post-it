import { AppBar, Typography, Toolbar, Button, Avatar } from "@material-ui/core";
import useStyles from './styles';
import memories from '../../images/cmqy88dotne31.png';
import { useHistory, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import decode from 'jwt-decode';


const Navbar = () => {
    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decoded = decode(token);
            if (decoded.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }

        //g
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location, user?.token])

    const logout = () => {
        dispatch({ type: 'LOGOUT' });

        history.push('/');
        setUser(null);
    };

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
        <div className={classes.brandContainer}>
            <Typography component={Link} to="/" className={classes.heading} variant='h2' align='center'>site-posts</Typography>
            <img className={classes.image} src={memories} alt='memories' height='60' />
        </div>
        <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                </div>
            ) : (
                <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
            )}
        </Toolbar>
        </AppBar>
    )
}

export default Navbar
