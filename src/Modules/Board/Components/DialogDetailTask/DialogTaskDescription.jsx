import { Box, Button, styled } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import LexicalEditor from '../../../../UI/Modules/LexicalEditor/LexicalEditor';
import LexicalEditorReadOnly from '../../../../UI/Modules/LexicalEditor/LexicalEditorReadOnly';
import {
  getTaskDetailThunk,
  updateDescriptionThunk,
} from '../../slice/taskDetailSlice';

const DialogTaskDescription = ({ taskId, payload, onSetTask }) => {
  const [isShowEditor, setIsShowEditor] = useState(false);
  const [description, setDescription] = useState(payload);

  // const dispatch = useDispatch();

  const watchEditor = (html) => {
    setDescription(html);
  };

  const submitDescriptionHandler = async () => {
    try {
      onSetTask((prev) => ({ ...prev, description: description }));
      setIsShowEditor(false);
      // await dispatch(updateDescriptionThunk({ taskId, description })).unwrap();
      // await dispatch(getTaskDetailThunk(taskId)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      setIsShowEditor(false);
    };
  }, []);

  useEffect(() => {
    onSetTask((prev) => ({ ...prev, description: payload }));
  }, []);

  return (
    <>
      {!isShowEditor && (
        <Box onClick={() => setIsShowEditor(true)}>
          <LexicalEditorReadOnly payload={description} />
        </Box>
      )}
      {isShowEditor && (
        <Box flexDirection='row'>
          <LexicalEditor payload={payload} onWatch={watchEditor} />
          <Box display='flex' justifyContent='flex-end' columnGap='12px'>
            <Button
              size='small'
              onClick={submitDescriptionHandler}
              variant='contained'
            >
              Save
            </Button>
            <Button size='small' onClick={() => setIsShowEditor(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default DialogTaskDescription;
