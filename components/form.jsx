import {Stack, TextField} from "@mui/material";
import {useCallback, useState} from "react";
import {Card} from "./card";

export const Form = () => {
  const [query, setQuery] = useState("");
  const inputHandler = useCallback((event) => setQuery(event.target.value));

  return (
    <Stack>
      <TextField value={query} onChange={inputHandler} />
      <Card query={query} />
    </Stack>
  );
};
