import { NavLink } from 'react-router-dom';
import { Grid } from '@mui/material';

type MenuItemProps = {
  link: string;
  title: string;
};

export default function MenuItem({ link, title }: MenuItemProps) {
  return (
    <Grid
      color="inherit"
      component={NavLink}
      to={link}
      sx={{
        textDecoration: "none",
        textTransform: "uppercase",
        borderBottom: "2px solid transparent",
        "&.active": {
          borderBottom: "2px solid",
          borderRadius: 0
        },
      }}
    >
      {title}
    </Grid>
  );
}