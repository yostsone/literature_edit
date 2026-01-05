import { useMediaQuery, useTheme } from '@mui/material';

export function isMobileWidth() {
  const theme = useTheme(); // Access the theme object
  return useMediaQuery(theme.breakpoints.down('md')); // Use the theme's `breakpoints`
}