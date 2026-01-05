import { useMediaQuery, Box } from '@mui/material';
import MobileMenu from './MobileMenu';
import DesktopMenu from './DesktopMenu';

export default function MainMenu() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
      <Box>
        {isMobile ? <MobileMenu /> : <DesktopMenu />}
      </Box>
  );
}