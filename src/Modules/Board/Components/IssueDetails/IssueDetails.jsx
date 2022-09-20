import { colors, styled, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Container } from '@mui/system';
import React from 'react';

const CustomizedListWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  borderRadius: '4px',
  backgroundColor: colors.blueGrey[50],
  minHeight: '400px',
}));

const ListHeading = styled(Typography)(({ theme }) => ({
  padding: '8px',
  color: colors.blueGrey[800],
  textTransform: 'uppercase',
}));

const IssueDetails = () => {
  return (
    <Grid2 marginTop={3} spacing={2} container>
      <Grid2 xs={3}>
        <CustomizedListWrapper>
          <ListHeading align='left' variant='subtitle2' fontWeight={700}>
            BACKLOG
          </ListHeading>
        </CustomizedListWrapper>
      </Grid2>
      <Grid2 xs={3}>
        <CustomizedListWrapper>
          <ListHeading align='left' variant='subtitle2' fontWeight={700}>
            SELECTED FOR DEVELOPMENT
          </ListHeading>
        </CustomizedListWrapper>
      </Grid2>
      <Grid2 xs={3}>
        <CustomizedListWrapper>
          <ListHeading align='left' variant='subtitle2' fontWeight={700}>
            IN PROGRESS
          </ListHeading>
        </CustomizedListWrapper>
      </Grid2>
      <Grid2 xs={3}>
        <CustomizedListWrapper>
          <ListHeading align='left' variant='subtitle2' fontWeight={700}>
            DONE
          </ListHeading>
        </CustomizedListWrapper>
      </Grid2>
    </Grid2>
  );
};

export default IssueDetails;
