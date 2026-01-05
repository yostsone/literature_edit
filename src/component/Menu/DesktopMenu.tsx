import { Grid } from '@mui/material';
import MenuItem from './MenuItem';
import { MENU_ITEMS } from '../../constants';

export default function DesktopMenu() {
  return (
    <Grid container gap={4}>
      { MENU_ITEMS.map((item) => (
        <MenuItem key={item.id} link={item.link} title={item.title} />
      ))}
    </Grid>
  );
}