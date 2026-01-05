import { useMediaQuery, useTheme } from '@mui/material';

export function isMobileWidth() {
  const theme = useTheme(); // Access the theme object
  return useMediaQuery(theme.breakpoints.down('md')); // Use the theme's `breakpoints`
}

export function canBeNumber(value: string): boolean {
  console.log(typeof value);
  if (value.trim() === "") return false;
  return !isNaN(Number(value));
}