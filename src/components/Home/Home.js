import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from 'material-ui-chip-input';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';

import { getPosts, getPostsBySearch } from '../../actions/posts';
import Pagination from '../Pagination';

import useStyles from '../../styles';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [ currentId, setCurrentId ] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);

    // Example of getting posts from the global store.
    const test_posts = useSelector((state) => {
        return state.posts
    });
    console.log(test_posts);

    const searchPost = () => {
        if (search.trim() || tags) {
            console.log('fetching search post');
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            history.push('/');
        }
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            console.log('searching');
            searchPost();
        }
    }

    const handleAdd = (tag) => {
        setTags([...tags, tag]);
    }

    const handleDelete = (tagToDelete) => {
        setTags(tags.filter((t) => (t !== tagToDelete)));
    }

   

    return (
        <Grow in>
            <Container maxWidth='xl'>
                <Grid className={classes.gridContainer} container justify='space-between' alignItems='stretch' spacing={3} style={{paddingLeft:0, paddingRight:0}}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setId={setCurrentId}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField name="search" variant="outlined" label="Search memories" fullWidth value={search} onKeyPress={handleKeyPress} onChange={(e) => {setSearch(e.target.value)}}/>
                            <ChipInput 
                            style={{margin: '10px 0'}}
                            value={tags}
                            onAdd={handleAdd}
                            onDelete={handleDelete}
                            label="Search Tags"
                            variant="outlined"
                            />
                            <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                        </AppBar>
                        
                        <Form currentId={currentId} setCurrentId={setCurrentId}/>

                        {(!searchQuery && !tags.length) && (
                            <Paper className={classes.pagination} elevation={6}>
                                <Pagination page={page}/>
                            </Paper>
                        )}
                        
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
