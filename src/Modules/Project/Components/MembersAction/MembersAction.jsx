import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  faPlus,
  faSquareMinus,
  faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Avatar,
  colors,
  Paper,
  styled,
  TableRow,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Fade,
  IconButton,
  Typography,
  Select,
  TextField,
  Grow,
  Button,
  Autocomplete,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Draggable from 'react-draggable';
import { Box } from '@mui/system';

const MembersActionWrapper = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '8px',
  overflow: 'hidden',
  top: '100%',
  left: '-100%',
  zIndex: 100,
  boxShadow:
    'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: colors.lightBlue[50],
    color: theme.palette.text,
    border: 'none',
    fontWeight: 700,
    fontSize: '14px',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderBottom: `0.5px solid ${colors.grey[300]}`,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.background.default,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const MembersAction = ({ isShowAction, onShowAction, members }) => {
  const [isExpand, setIsExpand] = useState(false);

  return (
    <Draggable handle='#draggable-head'>
      <Fade in={isShowAction}>
        <MembersActionWrapper>
          <TableContainer sx={{ maxHeight: 320, overflow: 'overlay' }}>
            <Table
              stickyHeader
              sx={{ minWidth: 560 }}
              aria-label='customized table'
            >
              <TableHead
                sx={{
                  cursor: 'move',
                }}
                id='draggable-head'
              >
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell align='left'>Avatar</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align='right'>
                    <IconButton
                      size='small'
                      onClick={onShowAction}
                      color='secondary'
                    >
                      <FontAwesomeIcon icon={faXmarkCircle} />
                    </IconButton>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {members.map((row) => (
                  <StyledTableRow key={row.userId}>
                    <StyledTableCell component='th' scope='row'>
                      {row.userId}
                    </StyledTableCell>
                    <StyledTableCell align='left'>
                      <Avatar alt={row.name} src={row.avatar} />
                    </StyledTableCell>
                    <StyledTableCell>{row.name}</StyledTableCell>
                    <StyledTableCell align='right'>
                      <IconButton color='error' size='small'>
                        <FontAwesomeIcon icon={faSquareMinus} />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                <StyledTableRow
                  sx={(theme) => ({
                    transition: 'all ease 0.2s',
                  })}
                  width={'100%'}
                >
                  <StyledTableCell component='th' scope='row'>
                    <Typography
                      sx={{
                        minWidth: '80px',
                      }}
                      variant='subtitle1'
                      fontWeight={700}
                    >
                      Add more
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align='left'>
                    <IconButton
                      onClick={() => setIsExpand((prev) => !prev)}
                      color='success'
                    >
                      <FontAwesomeIcon
                        icon={!isExpand ? faPlus : faXmarkCircle}
                      />
                    </IconButton>
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      minWidth: '120px',
                    }}
                  >
                    <Grow in={isExpand}>
                      <Autocomplete
                        id='combo-box-demo'
                        size='small'
                        options={[
                          { label: 'The Shawshank Redemption', year: 1994 },
                          { label: 'The Godfather', year: 1972 },
                        ]}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Grow>
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    <Grow in={isExpand}>
                      <Button color='primary' variant='contained'>
                        Add
                      </Button>
                    </Grow>
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </MembersActionWrapper>
      </Fade>
    </Draggable>
  );
};

export default MembersAction;
