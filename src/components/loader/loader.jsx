import { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export function LoadingModal(props) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}