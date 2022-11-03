import {
  Box,
  Button,
  Chip,
  Menu,
  MenuItem,
  Typography,
  styled,
  colors,
  Avatar,
} from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import usersAPIs from '../../../../app/apis/userAPIs/usersAPIs';
import { useRequest } from '../../../../app/hooks/request/useRequest';

const { getUserByProjectId } = usersAPIs;

const Group = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '8px',
}));

const DialogTaskAssignees = () => {
  const { projectId } = useParams();
  const { data: users } = useRequest(() => getUserByProjectId(+projectId));
  const [assignees, setAssignees] = useState([]);
  // Users MENU
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleDelete = (userId) => {
    setAssignees((prev) => {
      const updatedUsers = prev.filter((item) => item.userId !== userId);
      return updatedUsers;
    });
  };
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuItemClick = (event, user) => {
    const isUserExist = assignees.some((item) => item.userId === user.userId);
    if (!isUserExist) {
      setAssignees((prev) => [...prev, user]);
      setAnchorEl(null);
    } else {
      handleDelete(user.userId);
      setAnchorEl(null);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Group>
        {assignees?.map((item) => {
          const { avatar, name, userId } = item;
          return (
            <Chip
              key={userId}
              color='info'
              variant='filled'
              onDelete={() => handleDelete(userId)}
              label={name}
              avatar={<Avatar src={avatar} />}
              sx={{ borderRadius: '6px' }}
            />
          );
        })}
        <Button
          onClick={handleClickListItem}
          size='small'
          sx={{ textTransform: 'initial' }}
        >
          + Add assignees
        </Button>
      </Group>
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
        {users?.map((user) => {
          const { avatar, email, name, phoneNumber, userId } = user;
          return (
            <MenuItem
              sx={{
                textTransform: 'capitalize',
                display: 'flex',
                columnGap: '8px',
              }}
              key={userId}
              selected={
                userId ===
                assignees?.find((item) => item.userId === userId)?.userId
              }
              onClick={(event) => handleMenuItemClick(event, user)}
            >
              <Group>
                <Avatar
                  sx={{ width: 32, height: 32 }}
                  alt={name}
                  src={avatar}
                />
                <Typography
                  variant='body2'
                  fontWeight={700}
                  color={colors.grey[700]}
                >
                  {name}
                </Typography>
              </Group>
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};

export default DialogTaskAssignees;
