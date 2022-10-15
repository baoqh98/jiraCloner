import React from 'react';

import {
  Select,
  InputLabel,
  TextField,
  MenuItem,
  Autocomplete,
  Slider,
  styled,
  colors,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useState } from 'react';
import { useRequest } from '../../../../app/hooks/request/useRequest';
import LexicalEditor from '../../../../UI/Modules/LexicalEditor';
import taskAPIs from '../../../../app/apis/taskAPIs/taskAPIs';
import usersAPIs from '../../../../app/apis/userAPIs/usersAPIs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBarsProgress,
  faCircleExclamation,
  faPen,
} from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons';

const Label = styled(InputLabel)(({ theme }) => ({
  fontSize: '12px',
  fontWeight: 700,
  color: colors.blueGrey[500],
}));

const StyledTextInput = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: colors.blueGrey[50],
    fontSize: 13,
  },
  '& .MuiInputBase-input:focus': {
    backgroundColor: '#fff',
  },

  '&:hover fieldset': {
    borderColor: 'transparent',
  },
}));

const StyledSelection = styled(Select)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: colors.blueGrey[50],
    fontSize: 13,
    padding: '7px 12px',
  },
}));

const StyledAutoCompleteInput = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    position: 'relative',
    backgroundColor: colors.blueGrey[50],
    fontSize: 13,
    padding: '12px 0',
  },
  '& .MuiAutocomplete-tag': {
    margin: '2px',
  },
}));

const StyledStatusInput = styled(Select)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: colors.blueGrey[50],
    fontSize: 13,
    margin: 0,
    padding: '7px 12px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const newOpts = (items) =>
  items?.map((item) => ({
    key: item.statusId,
    statusName: item.statusName,
    icon:
      item.statusId === '1'
        ? faPen
        : item.statusId === '2'
        ? faCircleExclamation
        : item.statusId === '3'
        ? faBarsProgress
        : faCheckSquare,

    color:
      item.statusId === '1'
        ? colors.red[500]
        : item.statusId === '2'
        ? colors.cyan[500]
        : item.statusId === '3'
        ? colors.blue[500]
        : colors.green[500],
  }));

const { getAllPriority, getAllStatus, getAllTaskType } = taskAPIs;
const { getUsers } = usersAPIs;

const DialogTaskForm = () => {
  const { data: allStatus } = useRequest(getAllStatus);
  const { data: allPriority } = useRequest(getAllPriority);
  const { data: allTaskType } = useRequest(getAllTaskType);
  const { data: allAssignees } = useRequest(getUsers);

  const [listUserAssign, setListUserAssign] = useState('');
  const [taskName, setTaskName] = useState('');
  const [statusId, setStatusId] = useState('');
  const [priorityId, setPriorityId] = useState('');
  const [typeId, setTypeId] = useState('');
  const [originalEstimate, setOriginalEstimate] = useState('');
  const [timeTrackingSpent, setTimeTrackingSpent] = useState('');
  const [timeTrackingRemaining, setTimeTrackingRemaining] = useState('');
  const [description, setDescription] = useState('');

  const listUserAssignHandler = (e) => {
    console.log(e);
    setListUserAssign('');
  };
  const taskNameChangeHandler = (e) => {
    setTaskName(e.target.value);
  };
  const statusChangeHandler = (e) => {
    setStatusId(e.target.value);
  };
  const priorityChangeHandler = (e) => {
    setPriorityId(e.target.value);
  };
  const typeIdChangeHandler = (e) => {
    setTypeId(e.target.typeIdue);
  };
  const originalEstimateChangeHandler = (e) => {
    setOriginalEstimate(e.target.value);
  };
  const timeTrackingSpentChangeHandler = (e) => {
    setTimeTrackingSpent(e.target.value);
  };
  const timeTrackingRemainingChangeHandler = (e) => {
    setTimeTrackingRemaining(e.target.value);
  };

  const watchEditor = (html) => {
    setDescription(html);
  };

  const options =
    allAssignees?.map((item) => ({
      label: item.name,
      id: item.userId,
    })) || [];

  return (
    <Grid2 spacing={2} container>
      <Grid2 xs={12}>
        <Label htmlFor='task-name' sx={{ fontSize: '12px' }}>
          Issues Name
        </Label>
        <StyledTextInput
          onChange={taskNameChangeHandler}
          value={taskName}
          id='task-name'
          size='small'
          placeholder='Issues Name'
          fullWidth
        />
      </Grid2>
      <Grid2 xs={12}>
        <Label htmlFor='issues-status' sx={{ fontSize: '12px' }}>
          Issues Status
        </Label>
        <StyledStatusInput
          onChange={statusChangeHandler}
          value={statusId}
          fullWidth
          id='issues-status'
        >
          <MenuItem disabled value=''>
            <em>Select Status</em>
          </MenuItem>
          {newOpts(allStatus)?.map((item) => (
            <MenuItem
              sx={{
                width: '100%',
              }}
              value={item.key}
              key={item.key}
            >
              <ListItemIcon
                sx={{
                  width: '48px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  style={{
                    color: item.color,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                sx={{
                  margin: 0,
                }}
              >
                {item.statusName}
              </ListItemText>
            </MenuItem>
          ))}
        </StyledStatusInput>
      </Grid2>
      <Grid2 xs={6}>
        <Label htmlFor='priority' sx={{ fontSize: '12px' }}>
          Priority
        </Label>
        <StyledSelection
          onChange={priorityChangeHandler}
          value={priorityId}
          sx={{ boxSizing: 'border-box' }}
          size='small'
          fullWidth
          id='priority'
          defaultValue=''
          placeholder='Select Assignees'
        >
          {allPriority?.map((item) => (
            <MenuItem key={item.priorityId} value={item.priorityId}>
              {item.priority}
            </MenuItem>
          ))}
        </StyledSelection>
      </Grid2>
      <Grid2 xs={6}>
        <Label htmlFor='task-type' sx={{ fontSize: '12px' }}>
          Task type
        </Label>
        <StyledSelection
          onChange={typeIdChangeHandler}
          value={typeId}
          sx={{ boxSizing: 'border-box', textTransform: 'capitalize' }}
          size='small'
          fullWidth
          id='task-type'
          defaultValue=''
        >
          {allTaskType?.map((item) => (
            <MenuItem
              sx={{ textTransform: 'capitalize' }}
              key={item.id}
              value={item.id}
            >
              {item.taskType}
            </MenuItem>
          ))}
        </StyledSelection>
      </Grid2>
      <Grid2 xs={12}>
        <Label htmlFor='assignees' sx={{ fontSize: '12px' }}>
          Assignees
        </Label>
        <Autocomplete
          sx={{
            position: 'relative',
            backgroundColor: colors.blueGrey[50],
            fontSize: 13,
          }}
          multiple
          size='small'
          options={options}
          fullWidth
          disablePortal={false}
          renderOption={(props, option) => (
            <MenuItem
              sx={{
                margin: 0,
                padding: '8px',
              }}
              {...props}
              key={option.id}
            >
              {option.label}
            </MenuItem>
          )}
          renderInput={(params) => (
            <StyledAutoCompleteInput
              placeholder='Select Assignees'
              {...params}
            />
          )}
        />
      </Grid2>
      <Grid2 xs={3}>
        <Label htmlFor='time-tracking' sx={{ fontSize: '12px' }}>
          Time Tracking
        </Label>
        <Slider size='small' defaultValue={80} valueLabelDisplay='auto' />
      </Grid2>
      <Grid2 xs={3}>
        <Label onChan htmlFor='o-estimate' sx={{ fontSize: '12px' }}>
          Original Estimate
        </Label>
        <StyledTextInput defaultValue={0} size='small' type='number' />
      </Grid2>
      <Grid2 xs={3}>
        <Label htmlFor='o-estimate' sx={{ fontSize: '12px' }}>
          Time spent
        </Label>
        <StyledTextInput defaultValue={0} size='small' type='number' />
      </Grid2>
      <Grid2 xs={3}>
        <Label htmlFor='o-estimate' sx={{ fontSize: '12px' }}>
          Time remaining
        </Label>
        <StyledTextInput defaultValue={0} size='small' type='number' />
      </Grid2>
      <Grid2 xs={12}>
        <Label htmlFor='o-estimate' sx={{ fontSize: '12px' }}>
          Description
        </Label>
        <LexicalEditor onWatch={watchEditor} />
      </Grid2>
    </Grid2>
  );
};

export default DialogTaskForm;
