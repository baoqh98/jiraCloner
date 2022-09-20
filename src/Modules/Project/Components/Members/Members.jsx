import React, { useState, useCallback, useEffect } from 'react';
import { Avatar, AvatarGroup, Box } from '@mui/material';
import MembersAction from '../MembersAction/MembersAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { useRequest } from '../../../../app/hooks/request/useRequest';
import usersAPIs from '../../../../app/apis/userAPIs/usersAPIs';

const { getUserByProjectId } = usersAPIs;

const Members = React.memo(({ projectId }) => {
  const [isShowAction, setIsShowAction] = useState(false);
  const [members, setMembers] = useState(null);
  const { data: requestGet } = useRequest(getUserByProjectId, {
    isManual: true,
  });

  const setIsShowActionHandler = () => {
    setIsShowAction((prev) => !prev);
  };

  const getMembersHandler = useCallback(
    async (projectId) => {
      try {
        const data = await requestGet(projectId);
        setMembers(data);
        return data;
      } catch (error) {
        setMembers([]);
        return error;
      }
    },
    [requestGet]
  );

  useEffect(() => {
    getMembersHandler(projectId);
  }, []);

  return (
    <Box sx={{ position: 'relative' }}>
      <AvatarGroup
        onClick={setIsShowActionHandler}
        sx={{ cursor: 'pointer' }}
        max={3}
      >
        {members?.map((item) => (
          <Avatar key={item.userId} alt={item.name} src={item.avatar} />
        ))}
        <Avatar>
          <FontAwesomeIcon icon={faPlus} />
        </Avatar>
      </AvatarGroup>
      <MembersAction
        projectId={projectId}
        onShowAction={setIsShowActionHandler}
        isShowAction={isShowAction}
        onSuccess={() => getMembersHandler(projectId)}
      />
    </Box>
  );
});

export default Members;
