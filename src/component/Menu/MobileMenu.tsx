import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {IconButton, Drawer, List, ListItem, ListItemText, Box} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { MENU_ITEMS } from '../../constants';

export default function MobileMenu () {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDrawer = (openState:boolean) => () => {
    setIsOpen(openState);
  };

  return (
    <Box
      sx={{ pr: "16px" }}
    >
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{ p: 0 }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
        <List>
          { MENU_ITEMS.map((item) => (
            <ListItem
              key={item.id}
              onClick={toggleDrawer(false)}
              component={Link}
              to={item.link}
              sx={{
                color: 'inherit',
                textDecoration: 'none',
                textTransform: 'uppercase',
                fontWeight: 'bold'
              }}
            >
              <ListItemText>
                {item.title}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
