import { Container } from '@mui/system';
import { alpha } from '@mui/system';
import {
  Typography,
  Box,
  styled,
  Chip,
  colors,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Button,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';

import { useRequest } from '../../../app/hooks/request/useRequest';
import projectAPIs from '../../../app/apis/projectAPIs/projectAPIs';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import Loader from '../../../UI/Display/Loader/Loader';
import Members from '../Components/Members/Members';

const Heading = styled(Box)(({ theme }) => ({
  textAlign: 'left',
}));

const TableCellHead = styled(TableCell)(({ theme }) => ({
  fontSize: '12px',
  fontWeight: 700,
  color: colors.blueGrey[700],
  backgroundColor: colors.blueGrey[50],
  borderBottom: `none`,
}));

const TableCellBody = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text,
  borderBottom: `1.5px solid ${colors.blueGrey[50]}`,
}));

const categoryProject = {
  app: 'Dự án phần mềm',
  web: 'Dự án web',
  mobile: 'Dự án di động',
};

const Project = () => {
  const { getAllProjects } = projectAPIs;
  const { data: projects, isLoading } = useRequest(getAllProjects);

  console.log(projects);

  const rows = projects?.map((row) => (
    <TableRow
      key={row.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCellBody>
        <Chip
          color='info'
          size='small'
          sx={(theme) => ({
            borderRadius: '4px',
            fontSize: '12px',
            color: theme.palette.primary.light,
          })}
          variant='outlined'
          label={`ID: ${row.id}`}
        />
      </TableCellBody>
      <TableCellBody
        sx={{
          maxWidth: 160,
        }}
      >
        <Typography variant='subtitle1' fontWeight={700}>
          {row.projectName}
        </Typography>
      </TableCellBody>
      <TableCellBody component='th' scope='row'>
        <Chip
          label={row.categoryName}
          sx={(theme) => ({
            color:
              row.categoryName === categoryProject['app']
                ? theme.palette.primary.light
                : row.categoryName === categoryProject['web']
                ? colors.green[500]
                : colors.amber[500],
            backgroundColor:
              row.categoryName === categoryProject['app']
                ? alpha(theme.palette.primary.light, 0.2)
                : row.categoryName === categoryProject['web']
                ? colors.green[50]
                : colors.amber[50],
          })}
        />
      </TableCellBody>
      <TableCellBody align='left'>
        <Members members={row.members} />
      </TableCellBody>
      <TableCellBody component='th' scope='row'>
        {row.creator.name}
      </TableCellBody>
      <TableCellBody
        sx={(theme) => ({
          maxWidth: 200,
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        })}
        align='left'
      >{`${row.description}`}</TableCellBody>
      <TableCellBody align='left'>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Button color='success'>
            <FontAwesomeIcon icon={faPen} />
          </Button>
          <Button color='error'>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Box>
      </TableCellBody>
    </TableRow>
  ));

  return (
    <Container maxWidth='xl'>
      <Grid marginTop={2} container>
        <Grid xs={4}>
          <Heading>
            <Typography fontWeight={700} variant='h5' component='h1'>
              Project Management
            </Typography>
          </Heading>
        </Grid>
      </Grid>
      {isLoading && <Loader />}
      {!isLoading && (
        <TableContainer
          sx={(theme) => ({
            overflow: 'overlay',
            marginTop: '24px',
            maxHeight: '80vh',
            borderRadius: '4px',
          })}
        >
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow
                sx={(theme) => ({
                  backgroundColor: colors.blueGrey[50],
                })}
              >
                <TableCellHead align='left'>ID</TableCellHead>
                <TableCellHead align='left'>Project Name</TableCellHead>
                <TableCellHead align='left'>Category</TableCellHead>
                <TableCellHead align='left'>Members</TableCellHead>
                <TableCellHead align='left'>Creator</TableCellHead>
                <TableCellHead align='left'>Description</TableCellHead>
                <TableCellHead align='left'></TableCellHead>
              </TableRow>
            </TableHead>
            <TableBody>{rows}</TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default Project;
