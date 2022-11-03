import { Box, Button, colors, Stack, styled, Paper } from '@mui/material';
import React, { useState } from 'react';
import taskAPIs from '../../../../app/apis/taskAPIs/taskAPIs';
import { useRequest } from '../../../../app/hooks/request/useRequest';

const textareaStyle = {
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

const CommentItem = styled(Box)(({ theme }) => ({}));

const { getComments, editComment, insertComment, deleteComment } = taskAPIs;

const DialogTaskComment = () => {
  const [isShowButton, setIsShowButton] = useState(false);
  const { data: comments } = useRequest(getComments);

  console.log(comments);

  return (
    <>
      <Box display='flex' flexDirection='column' width='100%'>
        <textarea
          onClick={() => setIsShowButton(true)}
          rows={3}
          style={textareaStyle}
          placeholder='Add comment'
        />
        {isShowButton && (
          <Box mt={1} display='flex' justifyContent='flex-end' gap='8px'>
            <Button variant='contained'>Save</Button>
            <Button onClick={() => setIsShowButton(false)}>Cancel</Button>
          </Box>
        )}
      </Box>
      <Box display='flex' flexDirection='column' width='100%'>
        <Stack>
          <CommentItem>some things</CommentItem>
        </Stack>
      </Box>
    </>
  );
};

export default DialogTaskComment;
