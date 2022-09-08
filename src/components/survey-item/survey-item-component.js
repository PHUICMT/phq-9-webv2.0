import FormControlLabel from '@mui/material/FormControlLabel';
import CardContent from '@mui/material/CardContent';
import { styled } from "@mui/material/styles";


export const StyledFormControlLabel = styled((props) => (
    <FormControlLabel {...props} />
))(({ _, checked }) => ({
    ".MuiFormControlLabel-label": checked && {
        color: "#1976d2",
        fontWeight: "bold",
        fontSize: '20px',
    }
}));

export const StyledCardContent = styled((props) => (
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