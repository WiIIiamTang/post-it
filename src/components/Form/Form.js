import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { useSelector } from 'react-redux';

const Form = ({ currentId, setCurrentId }) => {
    const post = useSelector(state => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: '',
    });
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if(post) setPostData(post);
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
        }

        clear();

        
    };

    
    const clear = () => {
        setCurrentId(null);
        setPostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: '',
        });
    };

    if (!user?.result?.name) {
        return (
          <Paper className={classes.paper}>
            <Typography variant="h6" align="center">
              Please Sign In to create start posting.
            </Typography>
          </Paper>
        );
      }
      
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>{currentId ? 'Editing' : 'Creating'} a memory</Typography>
                {/* <TextField name="creator" fullWidth variant='outlined' label='Creator'
                    value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
                /> */}
                <TextField name="title" fullWidth variant='outlined' label='Title'
                    value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                />
                <TextField name="message" fullWidth variant='outlined' label='Message'
                    value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                />
                <TextField name="tags" fullWidth variant='outlined' label='Tags'
                    value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',').map(s => s.trim()) })}
                />

                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple ={false}
                        onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})}
                    />
                </div>
                
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
                <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
};

export default Form;