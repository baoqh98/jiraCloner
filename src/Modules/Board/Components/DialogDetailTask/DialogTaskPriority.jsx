import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  MenuItem,
  Menu,
  Button,
  colors,
  styled,
  Typography,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import taskAPIs from '../../../../app/apis/taskAPIs/taskAPIs';
import { useRequest } from '../../../../app/hooks/request/useRequest';
import {
  getTaskDetailThunk,
  updatePriorityThunk,
} from '../../slice/taskDetailSlice';

const TaskTypeButton = styled(Button)(({ theme }) => ({
  color: colors.grey[700],
  fontWeight: 700,
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: colors.blueGrey[50],
  },
}));

const priorityIcons = (priority) => {
  const priorityData = [
    {
      priority: 1,
      icon: faArrowUp,
      color: colors.red[500],
    },
    {
      priority: 2,
      icon: faArrowUp,
      color: colors.orange[500],
    },
    {
      priority: 3,
      icon: faArrowDown,
      color: colors.green[500],
    },
    {
      priority: 4,
      icon: faArrowDown,
      color: colors.lightBlue[500],
    },
  ];
  const priorityItem = priorityData.find((item) => item.priority === priority);
  return (
    <FontAwesomeIcon
      style={{ color: priorityItem.color }}
      icon={priorityItem.icon}
    />
  );
};

const { getAllPriority } = taskAPIs;
const DialogTaskPriority = ({ taskId, payload, onSetTask }) => {
  const dispatch = useDispatch();
  // PRIORITY MENU
  const { data: priorities } = useRequest(getAllPriority);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState(payload);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const curPrior = priorities?.find(
    (item) => item.priorityId === selectedPriority
  );
  const handleMenuItemClick = (event, priorityId) => {
    onSetTask((prev) => ({ ...prev, priorityId: selectedPriority }));
    setSelectedPriority(priorityId);
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const updatePriorityHandler = async () => {
  //   try {
  //     await dispatch(
  //       updatePriorityThunk({ taskId, priorityId: selectedPriority })
  //     ).unwrap();
  //     await dispatch(getTaskDetailThunk(taskId)).unwrap();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   updatePriorityHandler();
  // }, [selectedPriority]);

  useEffect(() => {
    onSetTask((prev) => ({ ...prev, priorityId: payload }));
  }, []);

  return (
    <Box>
      <TaskTypeButton
        startIcon={priorityIcons(selectedPriority)}
        onClick={handleClickListItem}
        variant='text'
      >
        {curPrior?.priority}
      </TaskTypeButton>
      <Menu
        id='lock-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {priorities?.map((item) => {
          const { priority, priorityId } = item;
          return (
            <MenuItem
              sx={{
                textTransform: 'capitalize',
                display: 'flex',
                columnGap: '8px',
              }}
              key={priorityId}
              selected={priorityId === selectedPriority}
              onClick={(event) => handleMenuItemClick(event, priorityId)}
            >
              {priorityIcons(priorityId)}
              <Typography
                variant='body2'
                fontWeight={700}
                color={colors.grey[700]}
              >
                {priority}
              </Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};

export default DialogTaskPriority;
