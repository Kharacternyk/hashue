import {FormControlLabel, Stack, Switch, TextField} from "@mui/material";
import {useCallback, useState} from "react";
import {useColorQuery} from "../hooks/use-color-query";
import {ColorGrid} from "./color-grid";

export const Form = () => {
  const { queryString, queryBytes, setQueryString } = useColorQuery("sha256");
  const [orderedByHue, setOrderedByHue] = useState(false);
  const queryHandler = useCallback((event) => {
    setQueryString(event.target.value);
  });
  const hueHandler = useCallback((event) =>
    setOrderedByHue(event.target.checked)
  );

  const hueSwitch = <Switch checked={orderedByHue} onChange={hueHandler} />;

  return (
    <Stack gap={1}>
      <TextField value={queryString} onChange={queryHandler} />
      <FormControlLabel control={hueSwitch} label="Order by hue" />
      <ColorGrid queryBytes={queryBytes} orderedByHue={orderedByHue} />
    </Stack>
  );
};
