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
  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Paper elevation={4}>
          <Stack gap={2} p={2} alignItems="center">
            <h1>Hashue</h1>
            <Form />
          </Stack>
        </Paper>
      </ThemeProvider>
    </StrictMode>
  );
};

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});
