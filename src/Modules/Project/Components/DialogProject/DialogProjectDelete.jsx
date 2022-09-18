import { Chip } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const DialogProjectDelete = ({ payload }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Chip
        variant='outlined'
        color='primary'
        sx={{
          borderRadius: '4px',
        }}
        label={`ID: ${payload.id}`}
      />
    </Box>
  );
};

export default DialogProjectDelete;
