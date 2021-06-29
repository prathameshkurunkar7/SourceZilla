import React, { useState } from 'react'
import { Paper, ListItem, ListItemText, ListItemAvatar, Avatar, List, TextField, Box, makeStyles, Typography, ListItemSecondaryAction, Divider, Fade } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, deleteComment } from './../../../redux/actions/InterviewExpAction'

const useStyles = makeStyles((theme) => ({
    paper: {
        boxShadow: '0 2px 4px rgb(24 4 50 / 24%)',
        borderRadius: 0,
        maxHeight: 450,
        overflow: 'auto',
        '&::-webkit-scrollbar': {
            width: '0.2em'
        },
        '&::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0, 0, 0, 0.0)',
        },
        '&::-webkit-scrollbar-thumb': {
            borderRadius: 20,
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0, 0, 0, 0.3)'
        },
    },
    commentInput: {
        padding: theme.spacing(2, 2, 1.5, 2),
    },
    list: {
    }
}))

function CommentBox({ comments, experienceId }) {
    const [commentBody, setCommentBody] = useState('')
    const classes = useStyles();
    const dispatch = useDispatch()
    const userId = useSelector((state) => state.auth.user.userId)

    const _handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addComment(commentBody, experienceId))
        setCommentBody('')
    }

    return (
        <React.Fragment>
            <Typography align="left" color="textPrimary" variant="h6" gutterBottom>
                COMMENTS
            </Typography>
            <Paper elevation={0} className={classes.paper}>
                <Box className={classes.commentInput}>
                    <form onSubmit={_handleSubmit}>
                        <TextField
                            label="Comment"
                            placeholder="Comment here..."
                            fullWidth
                            onChange={(e) => setCommentBody(e.target.value)}
                            value={commentBody}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </form>
                </Box>
            </Paper>

            <Paper elevation={0} className={classes.paper}>
                <List className={classes.list}>
                    {comments && comments.length !== 0 && comments.map((comment, index) => {
                        return (
                            <Fade in timeout={1000}>
                                <ListItem key={index}>
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={comment.commentBy}
                                            src={`/experience/file/${comment.CommentByProfileImage}`}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={comment.commentBy}
                                        secondary={comment.commentBody}
                                    />
                                    {comment.commentByUser_id === userId && (
                                        <ListItemSecondaryAction >
                                            <IconButton onClick={() => dispatch(deleteComment(comment._id, experienceId))} edge="end" >
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    )}
                                    <Divider />
                                </ListItem>
                            </Fade>
                        )
                    })}
                </List>
            </Paper>
        </React.Fragment>
    )
}

export default CommentBox
