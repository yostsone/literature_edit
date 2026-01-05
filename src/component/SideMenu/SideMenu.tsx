import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, alpha } from '@mui/material';
import type { SetBucketsByType } from '../../types/highlightTypes';
import SideMenuItems from './SideMenuItems';
import AddHighLightModal from "../Modal/AddHighLight/AddHighLightModal";

type SideMenuProps = {
  pdfText: string;
  textRef: React.RefObject<HTMLDivElement | null>;
  setBucketsByType: SetBucketsByType;
}

export default function SideMenu({ textRef, setBucketsByType, pdfText }: SideMenuProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [bucketClicked, setBucketClicked] = useState<{ id: number, type: string, selection: { start: number, end: number } | null}>({ id: 0, type: '', selection: null });

  useEffect(() => {
    if (bucketClicked.id !== 0) {
      setIsOpen(true);
    }
  }, [bucketClicked]);

  return (
    <Grid
      size={2}
      sx={{
        position: "sticky",
        top: { xs: "55px", sm: "60px",  md: "80px"},
        alignSelf: "flex-start",
        width: { xs: "100%", sm: "100%", md: "auto"},
      }}
    >
      <Grid
        sx={(theme) => ({
          backgroundColor: theme.palette.background.paper,
        })}
      >
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
          <SideMenuItems textRef={textRef} setBucketClicked={setBucketClicked}/>
          <AddHighLightModal
            isOpen={isOpen}
            onClose={setIsOpen}
            bucketType={bucketClicked.type}
            selection={bucketClicked.selection}
            setBucketsByType={setBucketsByType}
            pdfText={pdfText}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}