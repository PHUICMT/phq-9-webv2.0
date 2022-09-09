import './modal.css'

import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { InputEmailField } from '../../components/input-email-field/input-email-field';

import { VideoPlayer } from '../../services/video-player';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node
};

export function ConfirmModal(props) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);

    const handleClose = () => {
        setOpen(false);
        props.onCloseModal(true);
    };

    return (
        <div>
            <BootstrapDialog
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                >
                    ตรวจสอบวิดีโอ และกรอก Email
                </BootstrapDialogTitle>
                <DialogContent dividers className='modal-content'>
                    <VideoPlayer className="video-modal" isModal={true} />
                    {/* TODO Remove Email Field */}
                    <InputEmailField
                        placeholder="โปรดระบุอีเมลของคุณ"
                        helperText="(จำเป็นต้องระบุ)"
                        label="โปรดระบุอีเมลของคุณ"
                        fieldName="Email"
                        handleChange={props.handleEmailChange}
                    />
                    {/* TODO Add  Check box User type*/}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        size="large"
                        variant="contained"
                    >
                        ต่อไป
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
