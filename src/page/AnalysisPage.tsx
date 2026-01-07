import {Box, Grid, Paper, Typography} from '@mui/material';
import {HIGHLIGHT_TYPES} from "../constants";
import BucketButton from "../component/Bucket/BucketButton";
import React from "react";

export default function AnalysisPage() {
  return (
    <Paper
      elevation={1}
      sx={{
        width: "100%",
        minHeight: "calc(100vh - 140px)",
        padding: "24px",
        boxSizing: "border-box",
      }}
      >
        <Typography variant="h4" gutterBottom>
          Literatūras analīze
        </Typography>
      <Grid
        container
        direction="row"
        justifyContent={"space-between"}
        rowSpacing={4}
        sx={{ paddingTop: "24px" }}
      >
        { HIGHLIGHT_TYPES.map((t) => (
          <Grid
            key={t.id}
            sx={{width: { xs: "65px", md:"142px"}}}
          >
            <BucketButton onClick={() => {}} keyValue={t.id} title={t.name} color={t.color}/>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}