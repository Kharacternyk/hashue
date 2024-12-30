import {
  createTheme,
  CssBaseline,
  Fab,
  Paper,
  Stack,
  SvgIcon,
  ThemeProvider,
} from "@mui/material";
import {StrictMode} from "react";
import GitHubLogo from "../images/github.svg?react";
import Logo from "../images/logo.svg?react";
import {Form} from "./form";

export const App = () => {
  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Stack alignItems="center">
          <Paper elevation={2} sx={paperStyle}>
            <Stack p={2} alignItems="center">
              <SvgIcon inheritViewBox component={Logo} sx={logoStyle} />
              <h1>Hashue</h1>
              <Form />
            </Stack>
          </Paper>
        </Stack>
        <Fab
          href="https://github.com/Kharacternyk/hashue"
          size="small"
          sx={fabStyle}
          aria-label="GitHub"
        >
          <SvgIcon inheritViewBox component={GitHubLogo} />
        </Fab>
      </ThemeProvider>
    </StrictMode>
  );
};

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const logoStyle = {
  width: 96,
  height: 96,
};

const fabStyle = {
  position: "absolute",
  right: 8,
  top: 8,
  background:
    "linear-gradient(-45deg, #2780da, #2780da 50%, #10a540 50%, #10a540)",
};

const paperStyle = { m: 2 };
