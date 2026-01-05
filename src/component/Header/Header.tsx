import { Link } from 'react-router-dom';
import { AppBar, Box, Grid, Toolbar, Typography } from '@mui/material';
import MainMenu from '../Menu/MainMenu';

export default function Header() {
  return (
    <Box>
      <AppBar
        component="header"
        position="fixed"
      >
        <Grid
          maxWidth={"lg"}
          sx={{
            justifyContent: "space-between",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <Grid
            container
            direction="row"
            sx={{
              justifyContent: {
                xs: "space-between",
                sm: "space-between",
                md: "flex-start"
              },
              alignItems: "center",
            }}
          >
            <Toolbar>
              <Typography
                variant="h6"
                component={Link}
                to="/literature_edit"
                sx={{
                  fontSize: "1rem",
                  color: "inherit",
                  textDecoration: "none",
                  border: "2px dashed white",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                  Nosaukums??
              </Typography>
            </Toolbar>
            <MainMenu />
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  );
}