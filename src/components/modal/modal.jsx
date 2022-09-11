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
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Download } from '@mui/icons-material';

import { EmoteReportTable } from '../report-popup/report-popup';
import { UserTypeRadioButtonsGroup } from '../user-type-radio/user-type-radio';

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
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
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

export function ReportModal(props) {
    const [open, setOpen] = useState(false);
    const [reportData, setReportData] = useState({});

    useEffect(() => {
        setOpen(props.open);
        setReportData(props.reportData);
    }, [props.open, props.reportData]);

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
                    onClose={handleClose}
                >
                    ผลการทดสอบ
                </BootstrapDialogTitle>
                <DialogContent dividers className='modal-content'>
                    <EmoteReportTable />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => { }}
                        size="large"
                        variant="contained"
                        endIcon={<Download />}
                    >
                        ดาวน์โหลดรายงาน
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
