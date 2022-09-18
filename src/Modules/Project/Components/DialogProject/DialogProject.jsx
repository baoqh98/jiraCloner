import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import React from 'react';
import DialogProjectDelete from './DialogProjectDelete';

const DialogProject = ({
  label,
  content,
  actionPrimary,
  actionError,
  onClose,
  isDialogOpen,
  payload,
}) => {
  return (
    <Dialog onClose={onClose} open={isDialogOpen}>
      <DialogTitle>{label}</DialogTitle>
      <DialogContent>
        {content === 'delete' ? (
          <DialogProjectDelete payload={payload} />
        ) : null}
      </DialogContent>
      <DialogActions>
        {actionPrimary && <Button color='primary'>{actionPrimary}</Button>}
        {actionError && <Button color='error'>{actionError}</Button>}
      </DialogActions>
    </Dialog>
  );
};

export default DialogProject;
