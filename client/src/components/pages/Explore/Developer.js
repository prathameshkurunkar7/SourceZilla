import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    developer_image: {
        borderRadius: '50%',
        objectFit: 'cover',
        transition: 'transform .35s linear',
        '&:hover': {
            transform: 'scale(1.1)',
            overflow: 'hidden'
        }
    }
});

function Developer({ name, imageURL }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <img
                className={classes.developer_image}
                width="200px"
                height="200px"
                alt={name}
                src={imageURL}
            />
            <h2 style={{ marginTop: '20px' }}>
                {name}
            </h2>
        </div>
    )
}

export default Developer
