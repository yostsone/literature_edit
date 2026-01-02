import { Grid } from '@mui/material';
import MenuItem from './MenuItem';

export default function MainMenu() {
  return (
    <Grid container gap={4}>
      <MenuItem link="/literature_edit/upload" title="Augšupielāde" />
      <MenuItem link="/literature_edit/analysis" title="Teksta analīze" />
      <MenuItem link="/literature_edit/notes" title="Piezīmes" />
    </Grid>
  );
}