import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { MyFormControlLabel } from './user-type-component';

export function UserTypeRadioButtonsGroup(props) {
    return (
        <FormControl>
            <FormLabel style={{ marginTop: 24 }}>
                ประเภทกลุ่มทดลอง
            </FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={props.onUserTypeChange}
            >
                <MyFormControlLabel value="normal" control={<Radio />} label="ปกติ" />
                <MyFormControlLabel value="depressed" control={<Radio />} label="มีภาวะซึมเศร้า" />
                <MyFormControlLabel value="being_treated" control={<Radio />} label="กำลังรักษา" />
            </RadioGroup>
        </FormControl>
    );
}
