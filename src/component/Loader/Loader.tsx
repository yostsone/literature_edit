import { Box, CircularProgress } from '@mui/material';

export default function Loader(){
  return (
    <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress enableTrackSlot size="3rem" />
    </Box>
  );
}