import React from 'react';
import {
  Avatar,
  Box,
  colors,
  Paper,
  AvatarGroup,
  styled,
  Typography,
} from '@mui/material';

const TaskList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '8px',
}));

const TaskItem = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  margin: '0 8px',
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  cursor: 'pointer',
  '&: hover': {
    backgroundColor: colors.grey[100],
  },
}));

const TaskHeading = styled(Typography)(({ theme }) => ({
  color: colors.blueGrey[800],
  textAlign: 'left',
  marginBottom: '16px',
}));

const TaskShortInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const TaskStatus = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  columnGap: '8px',
}));

const Priority = styled(Box)(({ theme }) => ({}));

const TaskType = styled(Box)(({ theme }) => ({}));

const TaskStack = ({ taskList }) => {
  return (
    <TaskList>
      {taskList?.map((item) => {
        const { taskId, taskName, priorityTask, taskTypeDetail } = item;
        return (
          <TaskItem key={taskId}>
            <TaskHeading variant='subtitle2' fontWeight={700}>
              {taskName}
            </TaskHeading>
            <TaskShortInfo>
              <TaskStatus>
                <Priority>{priorityTask.priority}</Priority>
                <TaskType>{taskTypeDetail.taskType}</TaskType>
              </TaskStatus>
              <AvatarGroup max={3}>
                <Avatar
                  sx={{ width: 24, height: 24 }}
                  alt='Remy Sharp'
                  src='/static/images/avatar/1.jpg'
                />
                <Avatar
                  sx={{ width: 24, height: 24 }}
                  alt='Remy Sharp'
                  src='/static/images/avatar/1.jpg'
                />
                <Avatar
                  sx={{ width: 24, height: 24 }}
                  alt='Remy Sharp'
                  src='/static/images/avatar/1.jpg'
                />
              </AvatarGroup>
            </TaskShortInfo>
          </TaskItem>
        );
      })}
    </TaskList>
  );
};

export default TaskStack;
