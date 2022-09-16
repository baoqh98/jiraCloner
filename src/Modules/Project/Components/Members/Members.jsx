import React, { useState } from 'react';
import { Avatar, AvatarGroup, Box, ClickAwayListener } from '@mui/material';
import MembersAction from '../MembersAction/MembersAction';

const Members = ({ members }) => {
  const [isShowAction, setIsShowAction] = useState(false);

  const setIsShowActionHandler = () => {
    setIsShowAction((prev) => !prev);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <AvatarGroup
        onClick={setIsShowActionHandler}
        sx={{ cursor: 'pointer' }}
        max={3}
      >
        {members.map((item) => (
          <Avatar key={item.userId} alt={item.name} src={item.avatar} />
        ))}
      </AvatarGroup>
      <MembersAction
        onShowAction={setIsShowActionHandler}
        isShowAction={isShowAction}
        members={members}
      />
    </Box>
  );
};

export default Members;
