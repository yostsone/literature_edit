import { useState } from 'react';
import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function FavoriteButton() {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <IconButton
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={(theme) => ({
        transition: "color 0.3s",
        color: hovered ? theme.palette.error.main : theme.palette.primary.main,
      })}
      >
        { hovered ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};