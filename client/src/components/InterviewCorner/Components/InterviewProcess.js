import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Card, CardContent, Divider, Box, Chip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    card: {
        boxShadow: '0 2px 4px rgb(24 4 50 / 24%)',
    },
    cardContent: {
        '&:last-child': {
            paddingBottom: theme.spacing(0)
        }
    },
    dividerIgnore: {
        display: 'none'
    },
    divider: {
        backgroundColor: 'lightgrey',
    }
}))

const Accordion = withStyles({
    root: {
        boxShadow: "none",
        "&:before": {
            display: "none"
        },
        "&$expanded": {
            margin: "auto"
        }
    },
    expanded: {}
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: "white",
        // marginBottom: -1,
        padding: 0,
        minHeight: 56,
        "&$expanded": {
            minHeight: 56
        }
    },
    content: {
        "&$expanded": {
            margin: "16px 0"
        }
    },
    expanded: {}
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(0, 0, 3, 0),
    }
}))(MuiAccordionDetails);

function InterviewProcess({ rounds }) {
    const classes = useStyles();
    return (
        <Card elevation={0} className={classes.card}>
            <CardContent className={classes.cardContent}>
                <Typography color="textPrimary" variant="h6" gutterBottom>
                    INTERVIEW EXPERIENCE
                </Typography>
                {rounds && rounds.length !== 0 && rounds.map((currRound, index) => {
                    return (
                        <React.Fragment key={index}>
                            <Accordion style={{ padding: 0, margin: 0 }} defaultExpanded={index === 0 && true}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1d-content"
                                    id="panel1d-header"
                                >
                                    <Box>
                                        <Typography color="textPrimary" variant="h6" gutterBottom>
                                            Round {index + 1}
                                        </Typography>
                                        <Typography color="textPrimary" variant="body2" gutterBottom>
                                            {currRound.roundName}
                                        </Typography>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box>
                                        <Chip style={{ marginBottom: 10, color: '#05A44B' }} size="small" label="Description" variant="outlined" />
                                        <Typography color="textPrimary" variant="subtitle2" gutterBottom>
                                            {currRound.description}
                                        </Typography>
                                        <Chip style={{ margin: '15px 0 10px 0', color: '#05A44B' }} size="small" label="Tips" variant="outlined" />
                                        <Typography>
                                            {currRound.tips}
                                        </Typography>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                            <Divider className={rounds?.length - 1 === index ? classes.dividerIgnore : classes.divider} />
                        </React.Fragment>
                    )
                })}
            </CardContent>
        </Card>
    );
}

export default InterviewProcess