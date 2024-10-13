import {Stack, TextField} from "@mui/material";
import {useCallback, useState} from "react";
import {ColorGrid} from "./color-grid";

export const Form = () => {
  const [query, setQuery] = useState("");
  const inputHandler = useCallback((event) => setQuery(event.target.value));

  return (
    <Stack>
      <TextField value={query} onChange={inputHandler} />
      <ColorGrid query={query} />
    </Stack>
  );
};
