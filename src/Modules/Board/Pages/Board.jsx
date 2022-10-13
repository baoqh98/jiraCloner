import { Container } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';
import { Typography, Box, styled, Chip, colors } from '@mui/material';
import Filter from '../Components/Filter/Filter';
import IssueDetails from '../Components/IssueDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import DialogTask from '../Components/DialogTask/DialogTask';

const Heading = styled(Box)(({ theme }) => ({
  textAlign: 'left',
}));
const ContactTags = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '8px',
}));

const tagsData = [
  {
    label: 'Github',
    icon: '/assets/brand/githubicon.png',
    link: 'https://github.com/hoquocbaoproton/jiraCloner',
  },
  {
    label: 'My Portfolio',
    icon: '/assets/brand/portfolioicon.png',
    link: 'https://www.topcv.vn/xem-cv/AVJRAgRSUVgOU1RbUgEBAw9SA1FbU1ICUgIEAA215f',
  },
  {
    label: 'hoquocbaocyber@gmail.com',
    icon: '/assets/brand/mail.png',
    link: '#',
  },
];

const Board = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dialogHandler = () => {
    setIsDialogOpen((prev) => !prev);
  };

  return (
    <>
      <DialogTask
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
      <Container maxWidth='xl'>
        <Grid marginTop={2} container>
          <Grid xs={4}>
            <Heading>
              <Typography fontWeight={700} variant='h5' component='h1'>
                Kaban Board
              </Typography>
            </Heading>
          </Grid>
          <Grid xs={8}>
            <ContactTags>
              {tagsData.map((item) => (
                <a
                  key={item.label}
                  style={{
                    textDecoration: 'none',
                  }}
                  target='_blank'
                  rel='noreferrer'
                  href={item.link}
                >
                  <Chip
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: colors.grey[300],
                      },
                    }}
                    label={item.label}
                    icon={<img height='70%' src={item.icon} alt={item.label} />}
                  />
                </a>
              ))}
            </ContactTags>
          </Grid>
          <Grid mt={3} xs={12}>
            <Filter dialogHandler={dialogHandler} />
            <IssueDetails />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Board;
