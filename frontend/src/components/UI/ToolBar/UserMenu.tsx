import { Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { logoutUser } from '../../../features/users/usersThunk.ts';
import { clearUser, userFromSlice } from '../../../features/users/usersSlice.ts';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/joy';
import { apiUrl } from '../../../globalConstants.ts';
import Typography from '@mui/material/Typography';

const UserMenu = () => {
  const user = useAppSelector(userFromSlice);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    dispatch(clearUser());
  };

  return (
    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0'}}>
      {user && (
        <Typography component="h1" variant="h5">
          {user.displayName}
        </Typography>
      )}
      <Button color='inherit' onClick={handleClick} sx={{
        marginLeft: '10px'
      }}>
        {user && user.googleId ?
          <Avatar alt={user.displayName} src={user.avatar} size="lg"/>
          :
          <Avatar alt={user?.displayName} src={apiUrl + '/' + user?.avatar} size="lg"/>
        }
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {user && user.role === 'admin' && <MenuItem onClick={() => {
          navigate('/admin');setAnchorEl(null);
        }}>Admin</MenuItem>}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;