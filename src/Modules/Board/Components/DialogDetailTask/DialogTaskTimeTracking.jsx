import { faCancel, faClock, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  Button,
  colors,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import { useState, useEffect } from 'react';

const TimeInput = styled(TextField)(({ theme }) => ({
  backgroundColor: colors.blueGrey[50],
  transition: 'all ease 0.1s',
  borderRadius: '4px',
  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
    display: 'none',
  },
  '& input[type=number]': {
    MozAppearance: 'textfield',
  },
  '&:hover': {
    backgroundColor: colors.blueGrey[100],
    '.MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
  '.MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}));

const Group = styled(Box)(
  ({
    theme,
    justify,
    align = 'center',
    gap = '0px',
    flexDirection = 'column',
  }) => ({
    display: 'flex',
    justifyContent: justify,
    alignItems: align,
    gap: gap,
    flexDirection: flexDirection,
  })
);

const DialogTaskTimeTracking = ({ taskId, payload, onSetTask }) => {
  const [timeTracking, setTimeTracking] = useState(payload);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const timeSpentChangeHandler = (e) => {
    setTimeTracking((prev) => ({
      ...prev,
      timeTrackingSpent: +e.target.value,
    }));
  };
  const timeRemainingChangeHandler = (e) => {
    setTimeTracking((prev) => ({
      ...prev,
      timeTrackingRemaining: +e.target.value,
    }));
  };

  const toggleDialog = () => {
    setDialogOpen((prev) => !prev);
  };

  const sumTimeTracking =
    timeTracking.timeTrackingSpent + timeTracking.timeTrackingRemaining;

  const saveTimeTrackingHandler = async () => {
    try {
      onSetTask((prev) => ({ ...prev, ...timeTracking }));
      toggleDialog();
    } catch (error) {}
  };

  useEffect(() => {
    onSetTask((prev) => ({ ...prev, ...payload }));
  }, []);

  return (
    <>
      <Dialog
        fullWidth
        maxWidth='xs'
        open={isDialogOpen}
        onClose={toggleDialog}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='caption' fontWeight={700}>
            Time Tracking
          </Typography>
          <IconButton color='primary' size='small' onClick={toggleDialog}>
            <FontAwesomeIcon icon={faXmark} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid2 spacing={2} container>
            <Grid2 xs={12}>
              <Group align='flex-start' flexDirection='row' gap='16px'>
                <FontAwesomeIcon
                  fontSize={24}
                  style={{ color: colors.blueGrey[500] }}
                  icon={faClock}
                />
                <Group
                  display='flex'
                  alignItems='center'
                  gap='8px'
                  width='100%'
                >
                  <Box
                    height={8}
                    sx={{
                      backgroundColor: colors.blueGrey[100],
                      borderRadius: '50px',
                      overflow: 'hidden',
                    }}
                    width='100%'
                  >
                    <Box
                      sx={{
                        backgroundColor: colors.lightBlue[500],
                        borderRadius: '50px',
                      }}
                      height={'100%'}
                      width={`${
                        (timeTracking.timeTrackingSpent / sumTimeTracking) * 100
                      }%`}
                    ></Box>
                  </Box>
                  <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    width='100%'
                  >
                    <Typography variant='body1' fontWeight={700}>
                      {timeTracking.timeTrackingSpent
                        ? `${timeTracking.timeTrackingSpent}h logged`
                        : 'No time logged'}
                    </Typography>
                    <Typography variant='body1' fontWeight={700}>
                      {timeTracking.timeTrackingRemaining
                        ? `${timeTracking.timeTrackingRemaining}h remaining`
                        : 'No time remaining'}
                    </Typography>
                  </Box>
                </Group>
              </Group>
            </Grid2>
            <Grid2 xs={6}>
              <Typography variant='caption' fontWeight={700}>
                Time spent (hours)
              </Typography>
              <TimeInput
                type='number'
                value={timeTracking.timeTrackingSpent}
                onChange={timeSpentChangeHandler}
                placeholder='Number'
                size='small'
                InputProps={{
                  inputProps: {
                    max: 100,
                    min: 0,
                  },
                }}
                fullWidth
              />
            </Grid2>
            <Grid2 xs={6}>
              <Typography variant='caption' fontWeight={700}>
                Time remaining (hours)
              </Typography>
              <TimeInput
                type='number'
                InputProps={{
                  inputProps: {
                    max: 100,
                    min: 0,
                  },
                }}
                value={timeTracking.timeTrackingRemaining}
                onChange={timeRemainingChangeHandler}
                placeholder='Number'
                size='small'
                fullWidth
              />
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogContent sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={saveTimeTrackingHandler} variant='contained'>
            Done
          </Button>
        </DialogContent>
      </Dialog>
      <Group
        onClick={toggleDialog}
        sx={{
          cursor: 'pointer',
          transition: 'all ease 0.2s',
          padding: '8px',
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: colors.blueGrey[50],
          },
        }}
        flexDirection='row'
        gap='16px'
      >
        <FontAwesomeIcon
          style={{ color: colors.blueGrey[500] }}
          icon={faClock}
        />
        <Group display='flex' alignItems='center' gap='8px' width='100%'>
          <Box
            height={6}
            sx={{
              backgroundColor: colors.blueGrey[100],
              borderRadius: '50px',
              overflow: 'hidden',
            }}
            width='100%'
          >
            <Box
              sx={{
                backgroundColor: colors.lightBlue[500],
                borderRadius: '50px',
              }}
              height={'100%'}
              width={`${
                (timeTracking.timeTrackingSpent / sumTimeTracking) * 100
              }%`}
            ></Box>
          </Box>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            width='100%'
          >
            <Typography variant='caption' lineHeight='12px'>
              {timeTracking.timeTrackingSpent
                ? `${timeTracking.timeTrackingSpent}h logged`
                : 'No time logged'}
            </Typography>
            <Typography variant='caption' lineHeight='12px'>
              {timeTracking.timeTrackingRemaining
                ? `${timeTracking.timeTrackingRemaining}h remaining`
                : 'No time remaining'}
            </Typography>
          </Box>
        </Group>
      </Group>
    </>
  );
};

export default DialogTaskTimeTracking;
