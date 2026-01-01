import { NavLink } from 'react-router-dom';
import { Button, Grid } from '@mui/material';

export default function MainMenu() {
  return (
    <Grid gap={4}>
      <Button
        color="inherit"
        component={NavLink}
        to="/literature_edit/upload"
        sx={{
          "&.active": {
            textDecoration: "underline",
          },
        }}
        >
          Augšupielāde
      </Button>
      <Button
        color="inherit"
        component={NavLink}
        to="/literature_edit/analysis"
        sx={{
          "&.active": {
            textDecoration: "underline"
          },
        }}
        >
          Teksta analīze
      </Button>
      <Button
        color="inherit"
        component={NavLink}
        to="/literature_edit/notes"
        sx={{
          "&.active": {
            textDecoration: "underline",
          },
        }}
      >
          Piezīmes
      </Button>
    </Grid>
  );
}