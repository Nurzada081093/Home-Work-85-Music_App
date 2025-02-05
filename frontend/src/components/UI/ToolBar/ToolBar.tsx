import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Container } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks.ts';
import { userFromSlice } from '../../../features/users/usersSlice.ts';
import UserMenu from './UserMenu.tsx';
import AnonymousUserMenu from './AnonymousUserMenu.tsx';

const ToolBar = () => {
  const user = useAppSelector(userFromSlice);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor: 'rgba(0,0,0,0.79)'}}>
        <Container>
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap'
          }}
          >
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h4"
                component={NavLink}
                sx={{
                  flexGrow: 1,
                  color: 'white',
                  textDecoration: 'none'
                }}
                to={'/'}>
                Music App
              </Typography>
            </Box>
            {user ? <UserMenu/> : <AnonymousUserMenu/>}
          </Toolbar>
        </Container>
      </AppBar>
      {user && (
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}
        >
          <Button
            variant="text"
            to={'/artists/addNewArtist'}
            component={NavLink}
            sx={{
              fontSize: '15px',
              color: 'white',
              '&:hover': {color: 'rgb(202,200,200)', fontWeight: 'bold', fontSize: '16px'},
            }}
          >
            New artist
          </Button>
          <Button
            variant="text"
            to={'/albums/addNewAlbum'}
            component={NavLink}
            sx={{
              fontSize: '15px',
              color: 'white',
              '&:hover': {color: 'rgb(202,200,200)', fontWeight: 'bold', fontSize: '16px'},
            }}
          >
            New album
          </Button>
          <Button
            variant="text"
            to={'/tracks/addNewTrack'}
            component={NavLink}
            sx={{
              fontSize: '15px',
              color: 'white',
              '&:hover': {color: 'rgb(202,200,200)', fontWeight: 'bold', fontSize: '16px'},
            }}
          >
            New track
          </Button>
          <Button
            variant="text"
            to={'/trackHistory'}
            component={NavLink}
            sx={{
              fontSize: '15px',
              color: 'white',
              '&:hover': {color: 'rgb(202,200,200)', fontWeight: 'bold', fontSize: '16px'},
            }}
          >
            Track history
          </Button>
        </Container>
      )}
    </Box>
  );
};

export default ToolBar;