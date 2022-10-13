import {
  Box,
  Button,
  Chip,
  colors,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import React from 'react';
import DialogTaskForm from './DialogTaskForm';
import { useParams } from 'react-router-dom';

const DialogTask = ({ isOpen, onClose }) => {
  const { projectName } = useParams();

  return (
    <Dialog onClose={onClose} open={isOpen}>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h5' fontWeight={700}>
            Create Issues
          </Typography>
          <Chip
            variant='filled'
            sx={{ backgroundColor: colors.blue[50], color: colors.blue[500] }}
            label={projectName}
          />
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogTaskForm projectName={projectName} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='error'>
          Cancel
        </Button>
        <Button variant='contained'>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogTask;
