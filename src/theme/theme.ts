import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#556b2f", // Moss green color
      light: "#8fbc8f", // Light mossy green
      dark: "#2e4600", // Deep forest green
      contrastText: "#ffffff", // White text for contrast
    },
    secondary: {
      main: "#a9a9a9", // Earthy neutral color
      light: "#dcdcdc", // Soft gray
      dark: "#696969", // Darker earthy gray
      contrastText: "#000000", // Black text for contrast
    },
    background: {
      default: "#f8f8f0", // Light cream background for warmth
      paper: "#fbfff5", // Light mossy green for paper elements
    },
    text: {
      primary: "#2e4600", // Dark green text
      secondary: "#6a6a6a", // Muted grayish-green text
    },
    success: {
      main: "#6b8e23", // Olive green
    },
    error: {
      main: "#b22222", // Earthy brownish red for errors
    },
    warning: {
      main: "#cd853f", // Earthy orange
    },
    info: {
      main: "#4682b4", // Muted earthy blue
    },
  },
  typography: {
    h4: {
      [`@media (max-width:899px)`]: { // to fit mobile menu width
        fontSize: "1.5rem"
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f8f8f0", // Override body background color
        },
      },
    }
  },
});


export default theme;