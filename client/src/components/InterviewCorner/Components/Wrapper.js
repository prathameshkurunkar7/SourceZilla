import React from 'react'
import Navbar from '../../Navbar'
import { Toolbar, CssBaseline } from '@material-ui/core'

function Wrapper({ children }) {
    return (
        <React.Fragment>
            <Navbar />
            <CssBaseline />
            <div style={{ marginTop: 30 }}>
                {children}
            </div>
            <Toolbar />
        </React.Fragment>
    )
}

export default Wrapper
