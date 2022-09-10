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

import { UserTypeRadioButtonsGroup } from '../../components/user-type-radio/user-type-radio';

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
    const [validUserType, setValidUserType] = useState(false);

    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);

    const handleClose = () => {
        setOpen(false);
        props.onCloseModal(true);
    };

    const handleOnUserTypeChange = (e) => {
        const value = e.target.value;
        setValidUserType(true);
        props.onUserTypeChange(value);
    }

    return (
        <div>
            <BootstrapDialog
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                >
                    ตรวจสอบวิดีโอ และระบุกลุ่มผู้ทดลอง
                </BootstrapDialogTitle>
                <DialogContent dividers className='modal-content'>
                    <VideoPlayer className="video-modal" isModal={true} />
                    <UserTypeRadioButtonsGroup onUserTypeChange={handleOnUserTypeChange} />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        size="large"
                        variant="contained"
                        disabled={!validUserType}
                    >
                        เริ่มทดสอบ
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
