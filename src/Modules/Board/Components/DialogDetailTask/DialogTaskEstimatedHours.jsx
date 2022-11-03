import { faSave, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, colors, IconButton, styled, TextField } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import {
//   getTaskDetailThunk,
//   updateEstimatedHourThunk,
// } from '../../slice/taskDetailSlice';

const TimeInput = styled(TextField)(({ theme }) => ({
  backgroundColor: colors.blueGrey[50],
  transition: 'all ease 0.1s',
  borderRadius: '4px',
  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
    display: 'none',
  },
  '& input[type=number]': {
    MozAppearance: 'textfield',
  },
  '&:hover': {
    backgroundColor: colors.blueGrey[100],
    '.MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
  '.MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}));

const DialogTaskEstimatedHours = ({ taskId, payload, onSetTask }) => {
  const [isShowSaveButton, setIsShowSaveButton] = useState(false);
  const [estimatedHour, setEstimatedHour] = useState(payload);

  const dispatch = useDispatch();

  const hourChangeHandler = (e) => {
    setIsShowSaveButton(true);
    if (e.target.value === '0') {
      setIsShowSaveButton(false);
    }
    setEstimatedHour(e.target.value);
  };

  const resetHandler = (e) => {
    setIsShowSaveButton(false);
    setEstimatedHour(payload);
  };

  const saveHourHandler = async () => {
    try {
      onSetTask((prev) => ({ ...prev, originalEstimate: +estimatedHour }));
      setIsShowSaveButton(false);
      // await dispatch(
      //   updateEstimatedHourThunk({ taskId, originalEstimate: estimatedHour })
      // ).unwrap();
      // dispatch(getTaskDetailThunk(taskId));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onSetTask((prev) => ({ ...prev, originalEstimate: +payload }));
  }, []);

  return (
    <TimeInput
      type='number'
      value={estimatedHour}
      onChange={hourChangeHandler}
      size='small'
      fullWidth
      placeholder='re-estimate...'
      InputProps={{
        inputProps: {
          max: 100,
          min: 0,
        },
        endAdornment: isShowSaveButton && (
          <Box display='flex'>
            <IconButton color='primary' size='small' onClick={saveHourHandler}>
              <FontAwesomeIcon icon={faSave} />
            </IconButton>
            <IconButton color='error' size='small' onClick={resetHandler}>
              <FontAwesomeIcon icon={faXmark} />
            </IconButton>
          </Box>
        ),
      }}
    />
  );
};

export default DialogTaskEstimatedHours;
