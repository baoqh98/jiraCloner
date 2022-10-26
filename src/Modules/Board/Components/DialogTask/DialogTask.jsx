import {
  Box,
  Button,
  Chip,
  colors,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import DialogTaskForm from './DialogTaskForm';
import { useParams } from 'react-router-dom';
import { useRequest } from '../../../../app/hooks/request/useRequest';
import { useDispatch } from 'react-redux';
import projectAPIs from '../../../../app/apis/projectAPIs/projectAPIs';
import { assignUserTaskThunk, createTaskThunk } from '../../slice/taskSlice';

const { getProjectDetail } = projectAPIs;

const DialogTask = ({ isOpen, onClose }) => {
  const { projectId } = useParams();
  const { data: projectDetail, error } = useRequest(
    () => getProjectDetail(+projectId),
    { isManual: false, deps: [+projectId] }
  );

  const dispatch = useDispatch();

  const [submitDataForm, setSubmitDataForm] = useState(null);
  const [assignees, setListAssignees] = useState(null);

  const submitHandler = async () => {
    try {
      const submitTask = {
        ...submitDataForm,
        projectId: `${projectId}`,
      };

      const resultCreateTask = await dispatch(
        createTaskThunk(submitTask)
      ).unwrap();

      console.log(resultCreateTask.taskId);

      // assignees.forEach(async (assignee) => {
      //   await dispatch(
      //     assignUserTaskThunk({
      //       taskId: resultCreateTask.taskId,
      //       userId: assignee.userId,
      //     })
      //   ).unwrap();

      //   console.log(projectDetail);
      // });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog onClose={onClose} open={isOpen}>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h5' fontWeight={700}>
            Create Issues
          </Typography>
          <Chip
            variant='filled'
            sx={{ backgroundColor: colors.blue[50], color: colors.blue[500] }}
            label={projectDetail?.projectName}
          />
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogTaskForm
          projectName={projectDetail?.projectName}
          members={projectDetail?.members}
          onMemberAssign={setListAssignees}
          onSubmit={setSubmitDataForm}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='error'>
          Cancel
        </Button>
        <Button onClick={submitHandler} variant='contained'>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogTask;
