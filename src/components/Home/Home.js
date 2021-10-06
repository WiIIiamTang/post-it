import { Container, Grow, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

import { getPosts } from '../../actions/posts';

import useStyles from '../../styles';

const Home = () => {
    const [ currentId, setCurrentId ] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

    // Example of getting posts from the global store.
    const test_posts = useSelector((state) => {
        return state.posts
    });
    console.log(test_posts);

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
        <Grow in>
            <Container>
                <Grid className={classes.mainContainer} container justify='space-between' alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setId={setCurrentId}/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId}/>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
