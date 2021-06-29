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
import moment from 'moment'

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

export default function SpamCompaniesTable({ spamCompanies, setSpamCompanies }) {
    const classes = useStyles();

    const handleDelete = (CompanyId) => {
        Axios.delete(`/admin/deleteCompany/${CompanyId}`)
            .then(({ data: { message } }) => {
                const companyNew = spamCompanies.filter(Company => Company._id !== CompanyId)
                setSpamCompanies(companyNew)
                console.log('Spam company Removed Successfully')
                toast.dark(message, AdminOptions)
            })
            .catch(error => {
                console.log(error.response.data)
            })
    }

    const handleUnmarkSpamPost = (companyId) => {
        Axios.patch(`/admin/revivecompany/`, { companyId })
            .then(({ data: { message } }) => {
                console.log('Company Removed Successfully')
                toast.dark(message, AdminOptions)
            })
            .catch(error => {
                console.log(error.response.data)
            })
        const companyNew = spamCompanies.filter(Company => Company._id !== companyId)
        setSpamCompanies(companyNew)
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">CompanyID</StyledTableCell>
                        <StyledTableCell align="left">CompanyName</StyledTableCell>
                        <StyledTableCell align="left">Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {spamCompanies && spamCompanies.length > 0 ? spamCompanies.map((Company, index) => (
                        <StyledTableRow key={index}>
                            <StyledTableCell align="left">
                                {Company._id}
                            </StyledTableCell>
                            <StyledTableCell align="left">{Company.companyName}</StyledTableCell>
                            <StyledTableCell align="left">
                                <Fab className="fab" size="small" onClick={() => handleDelete(Company._id)} color="secondary" aria-label="delete" >
                                    <DeleteOutlineIcon />
                                </Fab>
                                <Fab onClick={() => handleUnmarkSpamPost(Company._id)} className="fab" size="small" color="primary" aria-label="review" >
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
