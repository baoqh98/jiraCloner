import React, { useContext } from 'react';
import {
  Avatar,
  Box,
  colors,
  Paper,
  AvatarGroup,
  styled,
  Typography,
} from '@mui/material';
import { BoardContext } from '../../Context/BoardContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDown,
  faArrowUp,
  faCheckToSlot,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';

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
  columnGap: '4px',
}));

const TaskTypeIcons = (taskType) => {
  const taskTypeData = [
    {
      taskType: 'bug',
      icon: faExclamationCircle,
      color: colors.red[500],
    },
    {
      taskType: 'new task',
      icon: faCheckToSlot,
      color: colors.blue[500],
    },
  ];
  const taskTypeItem = taskTypeData.find((item) => item.taskType === taskType);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: taskTypeItem.color,
        fontWeight: 500,
        columnGap: '8px',
      }}
    >
      <FontAwesomeIcon icon={taskTypeItem.icon} />
      <Typography
        sx={{ textTransform: 'capitalize' }}
        variant='caption'
        fontWeight={500}
      >
        {taskTypeItem.taskType}
      </Typography>
    </Box>
  );
};

const PriorityIcons = (priority) => {
  const priorityData = [
    {
      priority: 'High',
      icon: faArrowUp,
      color: colors.red[500],
    },
    {
      priority: 'Medium',
      icon: faArrowUp,
      color: colors.orange[500],
    },
    {
      priority: 'Low',
      icon: faArrowDown,
      color: colors.green[500],
    },
    {
      priority: 'Lowest',
      icon: faArrowDown,
      color: colors.lightBlue[500],
    },
  ];
  const priorityItem = priorityData.find((item) => item.priority === priority);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: priorityItem.color,
        fontWeight: 500,
        height: '24px',
        width: '24px',
      }}
    >
      <FontAwesomeIcon icon={priorityItem.icon} />
    </Box>
  );
};

const TaskStack = ({ taskList }) => {
  const { toggleDialogTaskDetail, setTaskId } = useContext(BoardContext);

  return (
    <TaskList>
      {taskList
        ?.map((item) => {
          const { taskId, taskName, priorityTask, taskTypeDetail } = item;
          return (
            <TaskItem
              onClick={() => {
                toggleDialogTaskDetail();
                setTaskId(taskId);
              }}
              key={taskId}
            >
              <TaskHeading variant='subtitle2' fontWeight={700}>
                {taskName}
              </TaskHeading>
              <TaskShortInfo>
                <TaskStatus>
                  {PriorityIcons(priorityTask.priority)}
                  {TaskTypeIcons(taskTypeDetail.taskType)}
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
        })
        .reverse()}
    </TaskList>
  );
};

export default TaskStack;
