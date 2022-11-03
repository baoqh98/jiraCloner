import { faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
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

import taskAPIs from '../../../../app/apis/taskAPIs/taskAPIs';
import { useRequest } from '../../../../app/hooks/request/useRequest';

const TaskTypeButton = styled(Button)(({ theme }) => ({
  color: colors.grey[700],
  fontWeight: 700,
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: colors.blueGrey[50],
  },
}));

const taskTypeIcons = (typeId) => {
  const taskTypeData = [
    {
      id: 1,
      icon: faExclamationCircle,
      color: colors.red[500],
    },
    {
      id: 2,
      icon: faCheckSquare,
      color: colors.blue[500],
    },
  ];

  const taskTypeItem = taskTypeData.find((item) => item.id === typeId);

  return (
    <FontAwesomeIcon
      style={{ color: taskTypeItem.color }}
      icon={taskTypeItem.icon}
    />
  );
};

const { getAllTaskType } = taskAPIs;
const DialogTaskType = ({ payload, taskId, onSetTask }) => {
  // TASKTYPE MENU
  const { data: taskType } = useRequest(getAllTaskType);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedType, setSelectedType] = useState(payload);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const curType = taskType?.find((item) => item.id === selectedType);
  const handleMenuItemClick = (event, typeId) => {
    onSetTask((prev) => ({ ...prev, typeId: selectedType }));
    setSelectedType(typeId);
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    onSetTask((prev) => ({ ...prev, typeId: payload }));
  }, []);

  return (
    <Box>
      <TaskTypeButton
        startIcon={taskTypeIcons(selectedType)}
        onClick={handleClickListItem}
        variant='text'
      >
        {curType?.taskType}
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
        {taskType?.map((item) => {
          const { id, taskType } = item;
          return (
            <MenuItem
              sx={{
                textTransform: 'capitalize',
                display: 'flex',
                columnGap: '8px',
              }}
              key={id}
              selected={id === selectedType}
              onClick={(event) => handleMenuItemClick(event, id)}
            >
              {taskTypeIcons(id)}
              <Typography
                variant='body2'
                fontWeight={700}
                color={colors.grey[700]}
              >
                {taskType}
              </Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};

export default DialogTaskType;
