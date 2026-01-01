import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
        sx={{
          textAlign: "center",
          py: 2, // Padding for spacing inside the footer
          width: "100%", // Full width
        }}
      >
        <Typography variant="body2">
          &copy; 2026 Literature Edit. All rights reserved.
        </Typography>
    </Box>
  );
}