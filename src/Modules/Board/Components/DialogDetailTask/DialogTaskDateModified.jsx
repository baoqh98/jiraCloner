import { Box, colors, Typography } from '@mui/material';
import React from 'react';

const DialogTaskDateModified = () => {
  return (
    <Box
      sx={{
        borderTop: `0.5px solid ${colors.grey[400]}`,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '16px',
        color: colors.grey[500],
      }}
      width='100%'
    >
      <Typography variant='caption'>Updated 2 hours</Typography>
      <Typography variant='caption'>Created 1 day ago</Typography>
    </Box>
  );
};

export default DialogTaskDateModified;
