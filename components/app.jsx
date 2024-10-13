import {
  CssBaseline,
  Paper,
  Stack,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {StrictMode} from "react";
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
