import { Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks.ts';
import { logoutUser } from '../../../features/users/usersThunk.ts';
import { clearUser } from '../../../features/users/usersSlice.ts';
import { AccountCircle } from '@mui/icons-material';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearUser());
  };

  return (
    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px'}}>
      <Button color='inherit' variant="text" to={'/artists/addNewArtist'} component={NavLink} sx={{fontSize: '14px'}}>New artist</Button>
      <Button color='inherit' variant="text" to={'/albums/addNewAlbum'} component={NavLink} sx={{fontSize: '14px'}}>New album</Button>
      <Button color='inherit' variant="text" to={'/tracks/addNewTrack'} component={NavLink} sx={{fontSize: '14px'}}>New track</Button>
      <Button color='inherit' variant="text" to={'/trackHistory'} component={NavLink} sx={{fontSize: '14px'}}>Track history</Button>
      <Button color='inherit' onClick={handleClick}>
        <AccountCircle fontSize="large"/>
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;