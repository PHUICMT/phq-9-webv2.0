import './survey-item.css';
import { styles } from './survey-item-styles';

import { useEffect, useState, useCallback } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2';
import { styled } from "@mui/material/styles";


export function RowRadioButtonsGroup(props) {

    const [index, setIndex] = useState(0);
    const [hoverStart, setHoverStart] = useState(0);

    useEffect(() => {
        setIndex(props.index);
    }, [index, props.index]);

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

    const MyFormControlLabel = (props) => {
        const radioGroup = useRadioGroup();

        let checked = false;

        if (radioGroup) {
            checked = String(radioGroup.value) === String(props.value);
        }

        return <StyledFormControlLabel checked={checked} {...props} />;
    }

    const getCurrentTime = () => {
        return Math.round((new Date()).getTime() / 1000);
    }

    const handleOnMouseEnter = () => {
        setHoverStart(
            getCurrentTime()
        );
    }

    const handleOnMouseLeave = () => {
        const value = {
            index: index,
            hover: {
                start: hoverStart,
                end: getCurrentTime()
            }
        }
        props.onMouseLeave(value);
    };

    return (
        <div
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
        >
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
                                    onChange={(_, value) => props.onRadioChange(index, value)}
                                >
                                    <MyFormControlLabel labelPlacement="top" value={0} control={<Radio />} label="0" />
                                    <MyFormControlLabel labelPlacement="top" value={1} control={<Radio />} label="1" />
                                    <MyFormControlLabel labelPlacement="top" value={2} control={<Radio />} label="2" />
                                    <MyFormControlLabel labelPlacement="top" value={3} control={<Radio />} label="3" />
                                </RadioGroup>
                            </FormControl>
                        </Grid2>
                    </Grid2>
                </StyledCardContent>
            </StyledCardContent>
        </div >
    );
}
