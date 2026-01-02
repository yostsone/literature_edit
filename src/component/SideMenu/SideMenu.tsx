import React from 'react';
import { Box, Grid, Paper, Typography, alpha } from '@mui/material';
import type { HighlightSpan } from '../HighLights/HighlightedText';
import SideMenuItems from "./SideMenuItems";

type SideMenuProps = {
  pdfText: string;
  textRef: React.RefObject<HTMLDivElement | null>;
  setSpansByType: (spans: Record<string, HighlightSpan[]>) => void
}

export default function SideMenu({ textRef, setSpansByType, pdfText }: SideMenuProps) {
  return (
    <Grid
      item
      size={2}
      sx={{
        position: "sticky",
        top: "80px",
        alignSelf: "flex-start",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Paper
          elevation={2}
          sx={(theme) => ({
            backgroundColor: alpha(theme.palette.secondary.main, 0.1),
            padding: "16px",
          })}
        >
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              marginBottom: "16px",
              fontWeight: "bold",
            }}
          >
           Burciņas
          </Typography>
          <SideMenuItems textRef={textRef} setSpansByType={setSpansByType} pdfText={pdfText}/>
        </Paper>
      </Box>
    </Grid>
  );
}