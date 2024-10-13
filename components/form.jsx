import {FormControlLabel, Stack, Switch, TextField} from "@mui/material";
import {useCallback, useState} from "react";
import {ColorGrid} from "./color-grid";

export const Form = () => {
  const [query, setQuery] = useState("");
  const [orderedByHue, setOrderedByHue] = useState(false);
  const queryHandler = useCallback((event) => setQuery(event.target.value));
  const hueHandler = useCallback((event) =>
    setOrderedByHue(event.target.checked)
  );

  const hueSwitch = <Switch checked={orderedByHue} onChange={hueHandler} />;

  return (
    <Stack>
      <TextField value={query} onChange={queryHandler} />
      <FormControlLabel control={hueSwitch} label="Order by hue" />
      <ColorGrid query={query} orderedByHue={orderedByHue} />
    </Stack>
  );
};
