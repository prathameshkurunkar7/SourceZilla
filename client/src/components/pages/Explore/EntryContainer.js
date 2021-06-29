import { Button, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

function EntryContainer() {
    const [isClicked, setIsClicked] = useState(false)
    if (isClicked) {
        return (
            <Redirect push to="/categories/" />
        )
    }
    return (
        <div>
            <Typography variant="h3" gutterBottom>
                Welcome To SourceZilla
            </Typography>
            <Typography variant="body1" >
                A resource sharing platform for keen learner's around the globe.
            </Typography>
            <Button onClick={() => setIsClicked(true)} className="explore_btn">
                Explore
            </Button>
        </div>
    )
}

export default EntryContainer
