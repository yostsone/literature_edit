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
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Toolbar>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1rem",
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