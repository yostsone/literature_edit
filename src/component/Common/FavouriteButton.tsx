import { useState } from 'react';
import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

type FavoriteButtonProps = {
  isFavorite: boolean;
};

export default function FavoriteButton({ isFavorite }: FavoriteButtonProps) {
  const [isHovered, setIsHovered] = useState<boolean>(isFavorite);

  return (
    <IconButton
      onClick={() => {
        setIsHovered((prev) => !prev);
      }}
      sx={(theme) => ({
        transition: "color 0.3s",
        color: isHovered ? theme.palette.error.main : theme.palette.primary.main,
      })}
      >
        { isHovered || isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};