import React, { useState } from 'react'
import { TextField, FormControl } from '@mui/material';
import isEmail from 'validator/lib/isEmail';

export function InputEmailField(props) {
    const [value, setValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [dirty, setDirty] = useState(false);

    const handleChange = event => {
        const val = event.target.value;
        const isValidEmail = isEmail(val);
        setIsValid(isValidEmail);
        setValue(val);
        props.handleChange(val, isValidEmail);
    }

    return (
        <React.Fragment>
            <FormControl>
                <TextField
                    error={dirty && isValid === false}
                    onBlur={() => setDirty(true)}
                    id={props.fieldName}
                    label={props.label}
                    name={props.fieldName}
                    variant="outlined"
                    size={'small'}
                    helperText={props.helperText}
                    value={value}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e) => handleChange(e)}
                    style={{ marginTop: 20, width: 400 }}
                />

            </FormControl>
        </React.Fragment>
    )
}