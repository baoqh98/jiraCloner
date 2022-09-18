import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import React from 'react';

const DialogProject = ({
  label,
  content,
  actionPrimary,
  actionError,
  onClose,
  isDialogOpen,
  onControl,
  payload,
}) => {
  return (
    <Dialog onClose={onClose} open={isDialogOpen}>
      <DialogTitle fontWeight={700}>{label}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        {actionError && (
          <Button onClick={onClose} color='error'>
            {actionError}
          </Button>
        )}
        {actionPrimary && (
          <Button onClick={onControl} variant='contained' color='primary'>
            {actionPrimary}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DialogProject;
