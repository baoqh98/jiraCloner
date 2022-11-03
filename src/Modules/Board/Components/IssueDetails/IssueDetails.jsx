import { useEffect } from 'react';
import { colors, styled, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box } from '@mui/system';
import React from 'react';
import { useParams } from 'react-router-dom';
import TaskStack from '../TaskStack/TaskStack';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectDetailTaskThunk } from '../../slice/taskSlice';
import { tasksSelector } from '../../../../app/store';
import { useContext } from 'react';
import { BoardContext } from '../../Context/BoardContext';

const CustomizedListWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  borderRadius: '4px',
  backgroundColor: colors.blueGrey[50],
  minHeight: '400px',
  paddingBottom: '16px',
}));

const ListHeading = styled(Typography)(({ theme }) => ({
  padding: '8px',
  color: colors.blueGrey[800],
  textTransform: 'uppercase',
}));

const IssueDetails = () => {
  const { projectId } = useParams();
  const { data: projectDetail } = useSelector(tasksSelector);
  const dispatch = useDispatch();

  const { successTrigger, toggleTrigger, statusTask } =
    useContext(BoardContext);

  const getProjectDetailHandler = async () => {
    try {
      await dispatch(getProjectDetailTaskThunk(projectId)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  let backlogTasks = [],
    devTasks = [],
    progressTasks = [],
    doneTasks = [];
  projectDetail?.lstTask.forEach((item) => {
    switch (item.statusId) {
      case '1':
        backlogTasks = item.lstTaskDeTail;
        break;
      case '2':
        devTasks = item.lstTaskDeTail;
        break;
      case '3':
        progressTasks = item.lstTaskDeTail;
        break;
      case '4':
        doneTasks = item.lstTaskDeTail;
        break;
      default:
        break;
    }
  });

  useEffect(() => {
    getProjectDetailHandler();
  }, []);

  useEffect(() => {
    if (successTrigger) {
      getProjectDetailHandler().then(() => toggleTrigger());
      return;
    }
  }, [successTrigger]);

  useEffect(() => {
    getProjectDetailHandler();
  }, [statusTask]);

  return (
    <Grid2 marginTop={3} spacing={2} container>
      <Grid2 xs={3}>
        <CustomizedListWrapper>
          <ListHeading align='left' variant='subtitle2' fontWeight={700}>
            BACKLOG
          </ListHeading>
          <TaskStack taskList={backlogTasks} />
        </CustomizedListWrapper>
      </Grid2>
      <Grid2 xs={3}>
        <CustomizedListWrapper>
          <ListHeading align='left' variant='subtitle2' fontWeight={700}>
            SELECTED FOR DEVELOPMENT
          </ListHeading>
          <TaskStack taskList={devTasks} />
        </CustomizedListWrapper>
      </Grid2>
      <Grid2 xs={3}>
        <CustomizedListWrapper>
          <ListHeading align='left' variant='subtitle2' fontWeight={700}>
            IN PROGRESS
          </ListHeading>
          <TaskStack taskList={progressTasks} />
        </CustomizedListWrapper>
      </Grid2>
      <Grid2 xs={3}>
        <CustomizedListWrapper>
          <ListHeading align='left' variant='subtitle2' fontWeight={700}>
            DONE
          </ListHeading>
          <TaskStack taskList={doneTasks} />
        </CustomizedListWrapper>
      </Grid2>
    </Grid2>
  );
};

export default IssueDetails;
