import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Avatar,
  AvatarGroup,
  colors,
  Paper,
  styled,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from '@mui/material';
import React from 'react';

const MembersAction = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
}));

const Members = ({ members }) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <AvatarGroup max={3}>
        {members.map((item) => (
          <Avatar key={item.userId} alt={item.name} src={item.avatar} />
        ))}
      </AvatarGroup>
      <MembersAction elevation={2}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label='customized table'>
            <TableHead>
              <TableRow>
                <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                <StyledTableCell align='right'>Calories</StyledTableCell>
                <StyledTableCell align='right'>Fat&nbsp;(g)</StyledTableCell>
                <StyledTableCell align='right'>Carbs&nbsp;(g)</StyledTableCell>
                <StyledTableCell align='right'>
                  Protein&nbsp;(g)
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component='th' scope='row'>
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {row.calories}
                  </StyledTableCell>
                  <StyledTableCell align='right'>{row.fat}</StyledTableCell>
                  <StyledTableCell align='right'>{row.carbs}</StyledTableCell>
                  <StyledTableCell align='right'>{row.protein}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MembersAction>
    </Box>
  );
};

export default Members;
