import { faTrash, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  styled,
  Box,
  IconButton,
  colors,
  Typography,
  Avatar,
  Skeleton,
  Button,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { BoardContext } from '../../Context/BoardContext';
import {
  deleteTaskThunk,
  getTaskDetailThunk,
  resetProjectDetailHandler,
  updateFullTaskThunk,
} from '../../slice/taskSlice';

import DialogTaskAssignees from './DialogTaskAssignees';
import DialogTaskComment from './DialogTaskComment';
import DialogTaskDateModified from './DialogTaskDateModified';
import DialogTaskDescription from './DialogTaskDescription';
import DialogTaskEstimatedHours from './DialogTaskEstimatedHours';
import DialogTaskPriority from './DialogTaskPriority';
import DialogTaskStatus from './DialogTaskStatus';
import DialogTaskTimeTracking from './DialogTaskTimeTracking';
import DialogTaskType from './DialogTaskType';

const Group = styled(Box)(
  ({ theme, justify, align = 'center', gap = '0px' }) => ({
    display: 'flex',
    justifyContent: justify,
    alignItems: align,
    gap: gap,
  })
);

const initialUpdateTask = {
  description: '',
  statusId: '',
  originalEstimate: 0,
  timeTrackingSpent: 0,
  timeTrackingRemaining: 0,
  typeId: 0,
  priorityId: 0,
};

const DialogDetailTask = () => {
  const {
    isDialogTaskDetail,
    taskId,
    toggleDialogTaskDetail,
    setTaskId,
    toggleTrigger,
  } = useContext(BoardContext);

  const [taskDetail, setTaskDetail] = useState(null);
  const [updateTask, setUpdateTask] = useState(initialUpdateTask);

  const dispatch = useDispatch();

  const closeDialogHandler = () => {
    setTaskId(null);
    setTaskDetail(null);
    toggleTrigger();
    toggleDialogTaskDetail();
  };

  const getTaskDetailHandler = async () => {
    try {
      const res = await dispatch(getTaskDetailThunk(taskId)).unwrap();
      setTaskDetail(res);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTaskHandler = async () => {
    try {
      await dispatch(deleteTaskThunk(taskId)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const updateHandler = async () => {
    try {
      const { taskId, projectId, taskName } = taskDetail;

      const fullyUpdatedTask = {
        listUserAsign: [0],
        taskId,
        projectId,
        taskName,
        ...updateTask,
      };
      console.log(fullyUpdatedTask);
      // const res = await dispatch(
      //   updateFullTaskThunk(fullyUpdatedTask)
      // ).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTaskDetailHandler();
  }, [taskId]);

  return (
    <Dialog
      fullWidth
      maxWidth='md'
      open={isDialogTaskDetail}
      onClose={closeDialogHandler}
    >
      {taskDetail ? (
        <>
          <DialogTitle>
            <Group justify='space-between'>
              <Group justify='flex-start' gap='8px'>
                <Chip
                  variant='filled'
                  label={taskDetail.alias}
                  sx={{
                    backgroundColor: colors.blue[50],
                    color: colors.blue[500],
                  }}
                />
                <DialogTaskType
                  onSetTask={setUpdateTask}
                  taskId={taskId}
                  payload={taskDetail.typeId}
                />
              </Group>
              <DialogActions>
                <IconButton
                  onClick={deleteTaskHandler}
                  size='small'
                  color='error'
                >
                  <FontAwesomeIcon icon={faTrash} />
                </IconButton>
                <IconButton
                  size='small'
                  color='primary'
                  onClick={closeDialogHandler}
                >
                  <FontAwesomeIcon icon={faX} />
                </IconButton>
              </DialogActions>
            </Group>
          </DialogTitle>
          <DialogContent>
            <Grid2 spacing={4} container>
              <Grid2 xs={7}>
                <Box sx={{ marginBottom: '24px' }}>
                  <Typography mb={1} variant='h4' fontWeight={700}>
                    {taskDetail.taskName}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='subtitle2' fontWeight={700}>
                    Description
                  </Typography>
                  <DialogTaskDescription
                    onSetTask={setUpdateTask}
                    taskId={taskId}
                    payload={taskDetail.description}
                  />
                </Box>
                <Box mt={2}>
                  <Typography mb={1} variant='body2' fontWeight={700}>
                    Comments
                  </Typography>
                  <Group align='flex-start' gap='12px'>
                    <Avatar sx={{ width: 32, height: 32 }}></Avatar>
                    <DialogTaskComment taskId={taskId} />
                  </Group>
                </Box>
              </Grid2>
              <Grid2 xs={5}>
                <Box>
                  <Typography mb={1} variant='body2' fontWeight={700}>
                    Status
                  </Typography>
                  <DialogTaskStatus
                    onSetTask={setUpdateTask}
                    taskId={taskId}
                    payload={taskDetail.statusId}
                  />
                </Box>
                <Box mt={3}>
                  <Typography mb={1} variant='body2' fontWeight={700}>
                    Assignees
                  </Typography>
                  <DialogTaskAssignees />
                </Box>
                <Box mt={3}>
                  <Typography mb={1} variant='body2' fontWeight={700}>
                    Priority
                  </Typography>
                  <DialogTaskPriority
                    onSetTask={setUpdateTask}
                    taskId={taskId}
                    payload={taskDetail.priorityId}
                  />
                </Box>
                <Box mt={3}>
                  <Typography mb={1} variant='body2' fontWeight={700}>
                    Original estimate (HOURS)
                  </Typography>
                  <DialogTaskEstimatedHours
                    onSetTask={setUpdateTask}
                    taskId={taskId}
                    payload={taskDetail.originalEstimate}
                  />
                </Box>
                <Box mt={3}>
                  <Typography mb={1} variant='body2' fontWeight={700}>
                    Time Tracking
                  </Typography>
                  <DialogTaskTimeTracking
                    onSetTask={setUpdateTask}
                    taskId={taskId}
                    payload={{
                      timeTrackingSpent: taskDetail.timeTrackingSpent,
                      timeTrackingRemaining: taskDetail.timeTrackingRemaining,
                    }}
                  />
                </Box>
                <Box mt={3}>
                  <DialogTaskDateModified />
                </Box>
              </Grid2>
            </Grid2>
            <DialogActions>
              <Button onClick={updateHandler} variant='contained'>
                Submit
              </Button>
            </DialogActions>
            <Box height={64} />
          </DialogContent>
        </>
      ) : (
        <DialogContent>
          <Skeleton variant='rounded' height={40} />
          <Grid2 mt={2} spacing={2} container>
            <Grid2 xs={7}>
              <Skeleton variant='rounded' height={300} />
              <Group mt={2} align='flex-start' gap='12px'>
                <Skeleton variant='circular' height={32} width={32} />
                <Skeleton variant='rounded' height={64} width={'100%'} />
              </Group>
            </Grid2>
            <Grid2 xs={5}>
              <Skeleton variant='rounded' height={300} />
            </Grid2>
          </Grid2>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default DialogDetailTask;
