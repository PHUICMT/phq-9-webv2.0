import './survey-item.css';
import { styles } from './survey-item-styles';

import { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2';

import { StyledFormControlLabel, StyledCardContent } from './survey-item-component';


export function RowRadioButtonsGroup(props) {
    const [index, setIndex] = useState(0);
    const [hoverStart, setHoverStart] = useState(0.0);
    const [radioValue, setRadioValue] = useState(-1);

    useEffect(() => {
        setIndex(props.index);
    }, [index, props.index]);

    const MyFormControlLabel = (props) => {
        const radioGroup = useRadioGroup();
        let checked = false;
        if (radioGroup) {
            checked = String(radioValue) === String(props.value);
        }
        return <StyledFormControlLabel checked={checked} {...props} />;
    }

    const handleOnRadioChange = (_, value) => {
        setRadioValue(value);
        props.onRadioChange(index, value)
    }

    const getCurrentTime = () => {
        return ((new Date()).getTime());
    }

    const handleOnMouseEnter = () => {
        setHoverStart(
            getCurrentTime()
        );
        props.onMouseEnter(index);
    }

    const handleOnMouseLeave = () => {
        const value = {
            index: index,
            totalTime: ((getCurrentTime() - hoverStart) / 1000.0)
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
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    onChange={handleOnRadioChange}
                                >
                                    <MyFormControlLabel disabled={props.disabled} value={0} control={<Radio />} label="(0) ไม่เลย" />
                                    <MyFormControlLabel disabled={props.disabled} value={1} control={<Radio />} label="(1) มีบางวันหรือไม่บ่อย" />
                                    <MyFormControlLabel disabled={props.disabled} value={2} control={<Radio />} label="(2) มีค่อนข้างบ่อย" />
                                    <MyFormControlLabel disabled={props.disabled} value={3} control={<Radio />} label="(3) มีเกือบทุกวัน" />
                                </RadioGroup>
                            </FormControl>
                        </Grid2>
                    </Grid2>
                </StyledCardContent>
            </StyledCardContent>
        </div >
    );
}
