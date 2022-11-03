import { Select, MenuItem, colors, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import taskAPIs from '../../../../app/apis/taskAPIs/taskAPIs';
import { useRequest } from '../../../../app/hooks/request/useRequest';
import { BoardContext } from '../../Context/BoardContext';
import {
  getTaskDetailThunk,
  updateStatusThunk,
} from '../../slice/taskDetailSlice';

const { getAllStatus } = taskAPIs;

const statusData = [
  {
    statusId: '1',
    bgcolor: colors.grey[300],
    color: colors.grey[900],
    hover: colors.grey[400],
  },
  {
    statusId: '2',
    bgcolor: colors.deepOrange[500],
    hover: colors.deepOrange[600],
    color: '#fff',
  },
  {
    statusId: '3',
    bgcolor: colors.blue[500],
    hover: colors.blue[600],
    color: '#fff',
  },
  {
    statusId: '4',
    bgcolor: colors.green[500],
    hover: colors.green[600],
    color: '#fff',
  },
];

const StatusSelect = styled(Select)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 700,
  transition: 'all ease 0.2s',
  '.MuiSelect-select': {
    padding: '0',
  },
  '.MuiOutlinedInput-notchedOutline': { border: 0, padding: '0' },
  '&:hover': {
    transform: 'scale(105%)',
  },
}));

const DialogTaskStatus = ({ taskId, payload, onSetTask }) => {
  const { toggleTrigger } = useContext(BoardContext);
  const [statusId, setStatusId] = useState(payload);
  const { data: status } = useRequest(getAllStatus);
  const { changeStatusTask } = useContext(BoardContext);

  const dispatch = useDispatch();

  const statusChangeHandler = (e) => {
    setStatusId(e.target.value);
  };

  const updateStatusHandler = async () => {
    try {
      onSetTask((prev) => ({ ...prev, statusId: statusId }));
      await dispatch(
        updateStatusThunk({ statusId: statusId, taskId })
      ).unwrap();

      toggleTrigger();
      // changeStatusTask(statusId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateStatusHandler();
  }, [statusId]);

  useEffect(() => {
    onSetTask((prev) => ({ ...prev, statusId: payload }));
  }, []);

  return (
    <StatusSelect
      size='small'
      displayEmpty={true}
      value={statusId}
      onChange={statusChangeHandler}
    >
      {status ? (
        status.map((item) => {
          const statusItemData = statusData.find(
            (sItem) => sItem.statusId === item.statusId
          );
          return (
            <MenuItem key={item.statusId} value={item.statusId}>
              <Box
                sx={{
                  padding: '4px 8px',
                  backgroundColor: statusItemData.bgcolor,
                  color: statusItemData.color,
                  borderRadius: '4px',
                  '&:hover': {
                    backgroundColor: statusItemData.hover,
                  },
                }}
              >
                <Typography variant='caption' fontWeight={700}>
                  {item.statusName}
                </Typography>
              </Box>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem value={payload}>-</MenuItem>
      )}
    </StatusSelect>
  );
};

export default DialogTaskStatus;
