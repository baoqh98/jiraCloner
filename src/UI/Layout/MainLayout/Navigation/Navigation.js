import React from 'react';
import { Box, colors } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  display: 'flex',
  justifyContent: 'space-between',
  height: '100vh',
  width: '80px',
  backgroundColor: theme.palette.primary.main,
}));

const NavbarStart = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  color: colors.grey[50],
  rowGap: 8,
}));

const Image = styled(Box)(({ theme }) => ({
  height: '56px',
  width: '56px',
  borderRadius: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}));

const IconButton = styled(Box)(({ theme }) => ({
  height: '56px',
  width: '56px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 24,
  borderRadius: '50px',
  cursor: 'pointer',
  '&: hover': {
    backgroundColor: alpha(colors.grey[50], 0.2),
  },
}));

const Navigation = () => {
  // return <Box sx={(theme) => classes(theme).sidebarWrapper}></Box>;
  return (
    <Navbar>
      <NavbarStart>
        <Image>
          <img
            width={'100%'}
            src='/logo-removebg-preview.png'
            alt='/logo-removebg-preview.png'
          />
        </Image>
        <IconButton>
          <FontAwesomeIcon icon={faSearch} />
        </IconButton>
        <IconButton>
          <FontAwesomeIcon icon={faPlus} />
        </IconButton>
      </NavbarStart>
    </Navbar>
  );
};

export default Navigation;
