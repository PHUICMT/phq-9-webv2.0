import './survey-item.css';
import { styles } from './survey-item-styles';

import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2';
import { styled } from "@mui/material/styles";


export function RowRadioButtonsGroup(props) {

    const StyledFormControlLabel = styled((props) => (
        <FormControlLabel {...props} />
    ))(({ _, checked }) => ({
        ".MuiFormControlLabel-label": checked && {
            color: "#1976d2",
            fontWeight: "bold",
            fontSize: '20px',
        }
    }));

    const StyledCardContent = styled((props) => (
        <CardContent {...props} />
    ))(({ _ }) => ({
        ".MuiCardContent-root": {
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
            borderRadius: "12px",
            backgroundColor: "rgba(255,255,255,0.5)",
            "&:hover": {
                backgroundColor: 'rgba(255,255,255,0.9)',
            }
        }
    }));

    function MyFormControlLabel(props) {
        const radioGroup = useRadioGroup();

        let checked = false;

        if (radioGroup) {
            checked = radioGroup.value === props.value;
        }

        return <StyledFormControlLabel checked={checked} {...props} />;
    }

    return (
        <StyledCardContent className="survey-content">
            <StyledCardContent className="survey-item">
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
                                <MyFormControlLabel labelPlacement="top" value="0" control={<Radio />} label="0" />
                                <MyFormControlLabel labelPlacement="top" value="1" control={<Radio />} label="1" />
                                <MyFormControlLabel labelPlacement="top" value="2" control={<Radio />} label="2" />
                                <MyFormControlLabel labelPlacement="top" value="3" control={<Radio />} label="3" />
                            </RadioGroup>
                        </FormControl>
                    </Grid2>
                </Grid2>
            </StyledCardContent>
        </StyledCardContent>
    );
}
