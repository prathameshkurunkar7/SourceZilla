import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { Fab } from '@material-ui/core';
import Axios from 'axios';
import { toast } from "react-toastify";
import { AdminOptions } from '../../../utils/utils';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ReplayIcon from '@material-ui/icons/Replay';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default function SpamExperiencesTable({ spamExperiences, setSpamExperiences }) {
    const classes = useStyles();

    const handleDelete = (companyId) => {
        Axios.delete(`/admin/deleteexperience/${companyId}/`)
            .then(({ data: { message } }) => {
                const expsNew = spamExperiences.filter(exp => exp._id !== companyId)
                setSpamExperiences(expsNew)
                console.log('Spam Experience Removed Successfully')
                toast.dark(message, AdminOptions)
            })
            .catch(error => {
                console.log(error.response.data)
            })
    }

    const handleUnmarkSpamPost = (experienceId) => {
        Axios.patch(`/admin/reviveexperience/`, { experienceId })
            .then(({ data: { message } }) => {
                console.log('Experience Removed Successfully')
                toast.dark(message, AdminOptions)
            })
            .catch(error => {
                console.log(error.response.data)
            })
        const expsNew = spamExperiences.filter(exp => exp._id !== experienceId)
        setSpamExperiences(expsNew)
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">ExperienceID</StyledTableCell>
                        <StyledTableCell align="left">Passout Year</StyledTableCell>
                        <StyledTableCell align="left">User Branch</StyledTableCell>
                        <StyledTableCell align="left">Role</StyledTableCell>
                        <StyledTableCell align="left">Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {spamExperiences && spamExperiences.length > 0 ? spamExperiences.map((exp, index) => (
                        <StyledTableRow key={index}>
                            <StyledTableCell align="left">
                                {exp._id}
                            </StyledTableCell>
                            <StyledTableCell align="left">{exp.contentUserInfo.passoutYear}</StyledTableCell>
                            <StyledTableCell align="left">{exp.contentUserInfo.branch}</StyledTableCell>
                            <StyledTableCell align="left">{exp.contentUserInfo.role}</StyledTableCell>
                            <StyledTableCell align="left">
                                <Fab className="fab" size="small" onClick={() => handleDelete(exp._id)} color="secondary" aria-label="delete" >
                                    <DeleteOutlineIcon />
                                </Fab>
                                <Fab onClick={() => handleUnmarkSpamPost(exp._id)} className="fab" size="small" color="primary" aria-label="review" >
                                    <ReplayIcon />
                                </Fab>
                            </StyledTableCell>
                        </StyledTableRow>
                    )) : (
                        <div className="loader">
                            <h4 style={{ textAlign: 'center' }} >No data found</h4>
                        </div>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
