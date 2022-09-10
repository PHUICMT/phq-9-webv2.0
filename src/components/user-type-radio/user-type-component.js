import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from "@mui/material/styles";
import { useRadioGroup } from "@mui/material/RadioGroup";


const StyledFormControlLabel = styled((props) => (
    <FormControlLabel {...props} />
))(({ _, checked }) => ({
    ".MuiFormControlLabel-label": checked && {
        color: "#1976d2",
        fontWeight: "bold",
        fontSize: '20px',
    }
}));

export const MyFormControlLabel = (props) => {
    const radioGroup = useRadioGroup();
    let checked = false;
    if (radioGroup) {
        checked = String(radioGroup.value) === String(props.value);
    }
    return <StyledFormControlLabel checked={checked} {...props} />;
}