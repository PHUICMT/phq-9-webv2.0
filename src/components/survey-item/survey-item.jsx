import { styles } from './survey-item-styles';

import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2';


export function RowRadioButtonsGroup(props) {
    return (
        <Card style={styles.card}>
            <CardContent style={styles.cardContent}>
                <Grid2 container spacing={2}>
                    <Grid2 xs={8} style={styles.typography}>
                        <Typography id="demo-row-radio-buttons-group-label">{props.title}</Typography>

                    </Grid2>
                    <Grid2 xs>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="0" control={<Radio />} label="0" />
                                <FormControlLabel value="1" control={<Radio />} label="1" />
                                <FormControlLabel value="2" control={<Radio />} label="2" />
                                <FormControlLabel value="3" control={<Radio />} label="3" />
                            </RadioGroup>
                        </FormControl>
                    </Grid2>
                </Grid2>
            </CardContent>
        </Card>
    );
}
