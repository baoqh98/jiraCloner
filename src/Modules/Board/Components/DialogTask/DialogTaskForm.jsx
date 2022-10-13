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
  Menu,
  OutlinedInput,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useState } from 'react';
import { useRequest } from '../../../../app/hooks/request/useRequest';
import LexicalEditor from '../../../../UI/Modules/LexicalEditor';
import taskAPIs from '../../../../app/apis/taskAPIs/taskAPIs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBarsProgress,
  faCircleExclamation,
  faExclamation,
  faExclamationCircle,
  faMarker,
  faPen,
} from '@fortawesome/free-solid-svg-icons';
import { faBookmark, faCheckSquare } from '@fortawesome/free-regular-svg-icons';

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
    padding: '12px 0  ',
  },
  '& .MuiAutocomplete-tag': {
    margin: '0 2px',
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

// const StatusList = ({ items }) => {
//   const newOpts = items?.map((item) => ({
//     key: item.statusId,
//     statusName: item.statusName,
//     icon:
//       item.statusId === '1'
//         ? faPen
//         : item.statusId === '2'
//         ? faCircleExclamation
//         : item.statusId === '3'
//         ? faBarsProgress
//         : faCheckSquare,

//     color:
//       item.statusId === '1'
//         ? colors.red[500]
//         : item.statusId === '2'
//         ? colors.cyan[500]
//         : item.statusId === '3'
//         ? colors.blue[500]
//         : colors.green[500],
//   }));
//   return (
//     <>
//       {newOpts.map((item) => (

//       ))}
//     </>
//   );
// };

const { getAllPriority, getAllStatus, getAllTaskType } = taskAPIs;

const DialogTaskForm = ({ projectName }) => {
  const { data: allStatus } = useRequest(getAllStatus);

  const [status, setStatus] = useState('1');
  const [description, setDescription] = useState();

  const statusChangeHandler = (event) => {
    setStatus(event.target.value);
  };

  const watchEditor = (html) => {
    setDescription(html);
  };

  const options = [
    { label: 'The Godfather', id: 1 },
    { label: 'Pulp Fiction', id: 2 },
  ];

  return (
    <Grid2 spacing={2} container>
      <Grid2 xs={12}>
        <Label htmlFor='task-name' sx={{ fontSize: '12px' }}>
          Issues Name
        </Label>
        <StyledTextInput
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
        <StyledStatusInput fullWidth id='issues-status'>
          {newOpts(allStatus)?.map((item) => (
            <MenuItem
              sx={{
                fontSize: '13px',
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
              <ListItemText sx={{ fontSize: '13px', margin: 0 }}>
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
          sx={{ boxSizing: 'border-box' }}
          size='small'
          fullWidth
          id='priority'
          defaultValue=''
          placeholder='Select Assignees'
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </StyledSelection>
      </Grid2>
      <Grid2 xs={6}>
        <Label htmlFor='task-type' sx={{ fontSize: '12px' }}>
          Task type
        </Label>
        <StyledSelection
          sx={{ boxSizing: 'border-box' }}
          size='small'
          fullWidth
          id='task-type'
          defaultValue=''
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
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
        <Label htmlFor='o-estimate' sx={{ fontSize: '12px' }}>
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
