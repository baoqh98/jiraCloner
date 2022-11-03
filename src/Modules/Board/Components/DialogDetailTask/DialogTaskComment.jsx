import {
  Box,
  Button,
  colors,
  Stack,
  styled,
  Paper,
  Avatar,
  Typography,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
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

const buttonStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  fontSize: '12px',
  padding: '0',
  cursor: 'pointer',
  color: colors.blueGrey[500],
  fontWeight: 700,
};

const CommentItem = styled(Box)(({ theme }) => ({
  marginBottom: '16px',
}));

const { getComments, editComment, insertComment, deleteComment } = taskAPIs;

const DialogTaskComment = ({ taskId }) => {
  const [isShowButton, setIsShowButton] = useState(false);
  const [isEditCommentId, setIsEditCommentId] = useState(null);
  const [commentList, setCommentList] = useState(null);
  const [comment, setComment] = useState('');
  const { data: getRequest } = useRequest(getComments, { isManual: true });
  const { data: putRequest } = useRequest(insertComment, { isManual: true });
  const { data: deleteRequest } = useRequest(deleteComment, { isManual: true });
  const { data: editRequest } = useRequest(editComment, { isManual: true });

  const getCommentsHandler = async () => {
    try {
      const res = await getRequest(taskId);
      setCommentList(res);
    } catch (error) {}
  };

  const changeHandler = (e) => {
    setComment(e.target.value);
  };

  const insertCommentHandler = async () => {
    try {
      await putRequest({ taskId, contentComment: comment });
      getCommentsHandler(taskId);
      setComment('');
      setIsShowButton(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCommentHandler = async (id) => {
    try {
      const res = await deleteRequest(id);
      getCommentsHandler(taskId);
    } catch (error) {
      console.log(error);
    }
  };

  const editCommentHandler = async (id) => {
    try {
      if (comment === '') return;
      console.log(id, comment);
      const res = await editRequest({ id, contentComment: comment });
      console.log(res);
      setIsEditCommentId(null);
      getCommentsHandler(taskId);
    } catch (error) {
      console.log(taskId);
    }
  };

  const editCommentSelected = commentList?.find(
    (item) => item.id === isEditCommentId
  );

  console.log(comment);

  useEffect(() => {
    getCommentsHandler();
  }, []);

  return (
    <Box display='flex' flexDirection='column' width='100%'>
      <Box display='flex' flexDirection='column' width='100%'>
        <textarea
          onChange={changeHandler}
          onClick={() => setIsShowButton(true)}
          rows={3}
          style={textareaStyle}
          placeholder='Add comment'
        />
        {isShowButton && (
          <Box mt={1} display='flex' justifyContent='flex-end' gap='8px'>
            <Button
              onClick={insertCommentHandler}
              size='small'
              variant='contained'
            >
              Save
            </Button>
            <Button size='small' onClick={() => setIsShowButton(false)}>
              Cancel
            </Button>
          </Box>
        )}
      </Box>
      <Box mt={4} display='flex' flexDirection='column' width='100%'>
        <Stack>
          {commentList
            ?.map((item) => {
              const { contentComment, id, user } = item;
              return (
                <CommentItem key={id} gap='16px' display='flex'>
                  <Avatar src={user.avatar} />
                  {editCommentSelected?.id !== id && (
                    <Box display='flex' flexDirection='column' width='100%'>
                      <Typography
                        variant='caption'
                        color={colors.blue[900]}
                        fontWeight={700}
                      >
                        {user.name}
                      </Typography>
                      <Typography
                        variant='body1'
                        color={colors.blueGrey[500]}
                        fontWeight={500}
                      >
                        {contentComment}
                      </Typography>
                      <Box mt={1}>
                        <button
                          onClick={() => {
                            setIsEditCommentId(id);
                            setComment(contentComment);
                          }}
                          style={buttonStyle}
                        >
                          Edit
                        </button>
                        <div
                          style={{
                            display: 'inline-block',
                            transform: 'translateY(-2px)',
                            margin: '0 8px',
                            height: '4px',
                            width: '4px',
                            borderRadius: '100px',
                            background: colors.blueGrey[500],
                          }}
                        ></div>
                        <button
                          onClick={() => deleteCommentHandler(id)}
                          style={buttonStyle}
                        >
                          Delete
                        </button>
                      </Box>
                    </Box>
                  )}
                  {editCommentSelected?.id === id && (
                    <Box width='100%'>
                      <textarea
                        onChange={changeHandler}
                        rows={3}
                        value={comment}
                        style={textareaStyle}
                        autoFocus
                        onFocus={(e) => e.currentTarget.select()}
                      />
                      <Box display='flex' gap='8px' justifyContent='flex-end'>
                        <Button
                          onClick={() => editCommentHandler(id)}
                          sx={{ textTransform: 'none' }}
                          variant='outlined'
                          size='small'
                        >
                          Change
                        </Button>
                        <Button
                          onClick={() => setIsEditCommentId(null)}
                          sx={{ textTransform: 'none' }}
                          size='small'
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Box>
                  )}
                </CommentItem>
              );
            })
            .reverse()}
        </Stack>
      </Box>
    </Box>
  );
};

export default DialogTaskComment;
