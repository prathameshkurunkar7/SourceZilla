import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from 'react-scroll'
import { Container, makeStyles, MenuItem } from '@material-ui/core';
import Logo from './../../../Images/favicon.png'
import ButtonAppBarCollapse from '../../NavComponents/ButtonAppBarCollapse';

const useStyles = makeStyles((theme) => ({
    link: {
        padding: theme.spacing(1),
        margin: '0 10px',
        fontSize: 19
    },
    active: {
        borderBottom: '4px solid #05a54b',
    },

    buttonBar: {
        [theme.breakpoints.down("sm")]: {
            display: "none"
        },
        padding: "20px",
    }
}))



export default function HideAppBar(props) {
    const classes = useStyles();

    const NavBarLinks = (
        <>
            <Link activeClass={classes.active} className={classes.link} to="Home" spy={true} smooth={true} duration={300} >
                Home
            </Link>
            <Link activeClass={classes.active} className={classes.link} to="AboutUs" spy={true} smooth={true} duration={300} >
                Motivation
            </Link>
            <Link activeClass={classes.active} className={classes.link} to="Features" spy={true} smooth={true} duration={300} >
                Features
            </Link>
            <Link activeClass={classes.active} className={classes.link} to="Developers" spy={true} smooth={true} duration={300} >
                Our Team
            </Link>
        </>
    )

    const NavBarLinksCollapse = (
        <>
            <MenuItem component={Link} activeClass={classes.active} className={classes.link} to="Home" spy={true} smooth={true} duration={300} >
                Home
            </MenuItem>
            <MenuItem component={Link} activeClass={classes.active} className={classes.link} to="AboutUs" spy={true} smooth={true} duration={300} >
                Motivation
            </MenuItem>
            <MenuItem component={Link} activeClass={classes.active} className={classes.link} to="Features" spy={true} smooth={true} duration={300} >
                Features
            </MenuItem>
            <MenuItem component={Link} activeClass={classes.active} className={classes.link} to="Developers" spy={true} smooth={true} duration={300} >
                Our Team
            </MenuItem>
        </>
    )

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar elevation={1} style={{ backgroundColor: 'white', color: 'black' }} >
                <Container maxWidth="xl">
                    <Toolbar className="toolbar_explore">
                        <div className="toolbarLeft">
                            <img className="navbar__logo" src={Logo} width="30px" height="30px" alt="" />
                            <a href='/' className="navbar__brand">
                                <span style={{ color: 'black' }}>Source</span><span style={{ color: '#04A54C', fontWeight: '700', fontSize: '30px' }}>Zilla</span>
                            </a>
                        </div>
                        <div className="toolbarRight">
                            <ButtonAppBarCollapse>
                                {NavBarLinksCollapse}
                            </ButtonAppBarCollapse>
                            <div className={classes.buttonBar} >
                                {NavBarLinks}
                            </div>
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar />
        </React.Fragment>
    );
}