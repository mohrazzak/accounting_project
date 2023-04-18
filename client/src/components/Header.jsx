import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useSelector } from 'react-redux';
// import { AiFillCloseCircle } from 'react-icons/ai';
import { XCircle, Menu as MenuIcon } from 'react-feather';
// import { AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { getIconComponent } from '../store/pages';
export default function Header() {
  let pages = useSelector((state) => state.pages);
  pages = pages.map((page) => ({ ...page, icon: getIconComponent(page.icon) }));
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen((state) => !state);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: 'dimgrey' }}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            AS
          </Typography>
          <IconButton
            sx={{ display: { xs: 'block', md: 'none' }, ml: 2 }}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <List sx={{ display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <ListItem key={page.url}>{page.title}</ListItem>
            ))}
          </List>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        <List
          sx={{
            backgroundColor: 'ghostwhite',
            height: '100%',
            fontSize: '2rem',
            width: '230px',
            maxWidth: '250px',
            padding: '4rem 1rem',
            position: 'relative',
          }}
        >
          <IconButton
            sx={{
              position: 'absolute',
              left: -5,
              top: -5,
              color: 'tomato',
              fontSize: '2.5rem',
            }}
            onClick={toggleDrawer}
          >
            <XCircle style={{ padding: '0', margin: '0' }} />
          </IconButton>
          {pages.map((page, i) => (
            <ListItem
              key={i}
              onClick={toggleDrawer}
              sx={{
                justifyContent: 'center',
                mb: 2,
                p: 1,
              }}
            >
              <Button
                component={Link}
                to={page.url}
                variant="contained"
                sx={{
                  fontSize: '1.4rem',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                {<page.icon />}
                <Typography>{page.title}</Typography>
              </Button>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
