import { alpha, Paper, Typography } from '@mui/material';

export default function HomePage() {
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
          Šeit kaut kāds apraksts??
        </Typography>
        <Paper
          elevation={2}
          sx={(theme) => ({
            backgroundColor: alpha(theme.palette.secondary.main, 0.1),
            padding: "16px",
            textAlign: "justify",
          })}
          >
          <Typography variant="body1" gutterBottom>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam imperdiet ante ac est egestas,
            ac consequat libero bibendum. Nunc consequat porta urna at tincidunt. Mauris quis erat dui.
            Pellentesque eleifend cursus odio, et ornare lectus semper nec. Nullam varius rutrum nisl ac dapibus.
            Integer eu consectetur arcu. Ut est justo, faucibus aliquam quam at, scelerisque interdum ipsum.
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
          </Typography>
        </Paper>
      </Paper>
  );
}