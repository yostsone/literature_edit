import { Link } from 'react-router-dom';
import AutoStoriesTwoToneIcon from '@mui/icons-material/AutoStoriesTwoTone';
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
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "inherit",
                  textDecoration: "none",
                  textTransform: "uppercase",
                }}
              >
                <span>Triloģija</span><AutoStoriesTwoToneIcon fontSize="small"/>
              </Typography>
            </Toolbar>
            <MainMenu />
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  );
}