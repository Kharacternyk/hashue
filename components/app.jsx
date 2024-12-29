import {
  CssBaseline,
  Paper,
  Stack,
  SvgIcon,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {StrictMode} from "react";
import Logo from "../images/logo.svg?react";
import {Form} from "./form";

export const App = () => {
  const paperStyle = { m: 2 };
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
