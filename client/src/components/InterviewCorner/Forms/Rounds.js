import React from 'react'
import { FieldArray, useFormikContext } from 'formik'
import { Box, Grid } from '@material-ui/core';
import { InputField } from './../FormFields';
import Button from './../FormFields/ButtonControl'
import { Typography, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

function Rounds(props) {
    const { values } = useFormikContext()
    const {
        formField: {
            roundName,
            roundInfo,
            roundTips
        }
    } = props
    // console.log(props)

    return (
        <FieldArray name="rounds">
            {({ push, remove }) => (
                <React.Fragment>
                    {values.rounds.map((_, index) => (
                        <Grid container spacing={3}>
                            <Grid style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} item container >
                                <Typography variant="h6" >
                                    {`Round ${index + 1}`}
                                </Typography>
                                <IconButton
                                    color="primary"
                                    fontSize="small"
                                    onClick={() => remove(index)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={12}>
                                <InputField
                                    name={`rounds.${index}.roundName`}
                                    label={roundName.label}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputField
                                    name={`rounds.${index}.roundInfo`}
                                    label={roundInfo.label}
                                    fullWidth
                                    multiline
                                    rows={3}
                                    rowsMax={6}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputField
                                    name={`rounds.${index}.roundTips`}
                                    label={roundTips.label}
                                    fullWidth
                                    multiline
                                    rows={3}
                                    rowsMax={6}
                                />
                            </Grid>
                        </Grid>
                    ))}

                    <Box marginTop={3}>
                        <Button
                            startIcon={<AddIcon />}
                            variant="contained"
                            onClick={() => push({ roundName: '', roundInfo: '', roundTips: '' })}
                        >
                            Add Round
                        </Button>
                    </Box>
                </React.Fragment>
            )
            }
        </FieldArray >
    )
}

export default Rounds
