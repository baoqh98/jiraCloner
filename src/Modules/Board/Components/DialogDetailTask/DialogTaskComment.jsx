import { Box, Button, colors } from '@mui/material';
import React, { useState } from 'react';

const DialogTaskComment = () => {
  const [isShowButton, setIsShowButton] = useState(false);

  const style = {
    width: '100%',
    position: 'relative',
    resize: 'none',
    borderRadius: '4px',
    border: `1px solid ${colors.grey[500]}`,
    padding: '8px 12px',
    fontSize: '14px',
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  };

  return (
    <Box display='flex' flexDirection='column' width='100%'>
      <textarea
        onClick={() => setIsShowButton(true)}
        rows={3}
        style={style}
        placeholder='Add comment'
      />
      {isShowButton && (
        <Box mt={1} display='flex' justifyContent='flex-end' gap='8px'>
          <Button variant='contained'>Save</Button>
          <Button onClick={() => setIsShowButton(false)}>Cancel</Button>
        </Box>
      )}
    </Box>
  );
};

export default DialogTaskComment;
