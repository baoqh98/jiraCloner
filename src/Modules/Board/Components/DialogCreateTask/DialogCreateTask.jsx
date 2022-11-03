import { useEffect, useContext } from 'react';
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
import { useDispatch } from 'react-redux';
import { assignUserTaskThunk, createTaskThunk } from '../../slice/taskSlice';
import { getProjectDetailThunk } from '../../../Project/slice/projectSlice';
import { BoardContext } from '../../Context/BoardContext';

const DialogTask = ({ isOpen, onClose, onSuccessTrigger }) => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const [projectDetail, setProjectDetail] = useState(null);
  const [submitDataForm, setSubmitDataForm] = useState(null);
  const [assignees, setListAssignees] = useState(null);

  const { successTrigger, toggleTrigger } = useContext(BoardContext);

  const getProjectDetailHandler = async () => {
    try {
      const data = dispatch(getProjectDetailThunk(projectId));
      if (data.error) {
        throw new Error(data.payload);
      }
      const result = await data.unwrap();
      setProjectDetail(result);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async () => {
    try {
      const submitTask = {
        ...submitDataForm,
        projectId: `${projectId}`,
      };

      const resultCreateTask = await dispatch(
        createTaskThunk(submitTask)
      ).unwrap();

      assignees.forEach(async (assignee) => {
        const res = await dispatch(
          assignUserTaskThunk({
            taskId: resultCreateTask.taskId,
            userId: assignee.userId,
          })
        ).unwrap();
      });

      getProjectDetailHandler().then(() => {
        toggleTrigger();
        onClose();
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProjectDetailHandler();
  }, [projectId]);

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
