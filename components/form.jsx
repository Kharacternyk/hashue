import {FormControlLabel, Stack, Switch, TextField} from "@mui/material";
import {useCallback, useState} from "react";
import {Helmet} from "react-helmet";
import {useColorQuery} from "../hooks/use-color-query";
import {ColorGrid} from "./color-grid";

export const Form = () => {
  const { queryString, trimmedQueryString, queryBytes, setQueryString } =
    useColorQuery();
  const [orderedByHue, setOrderedByHue] = useState(false);
  const queryHandler = useCallback((event) => {
    setQueryString(event.target.value);
  });
  const hueHandler = useCallback((event) =>
    setOrderedByHue(event.target.checked)
  );
  const title = (trimmedQueryString && `${trimmedQueryString} | `) + "Hashue";

  const hueSwitch = <Switch checked={orderedByHue} onChange={hueHandler} />;

  return (
    <Stack gap={1}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <TextField
        value={queryString}
        onChange={queryHandler}
        variant="standard"
        placeholder="Type here…"
      />
      <FormControlLabel control={hueSwitch} label="Order by hue" />
      <ColorGrid queryBytes={queryBytes} orderedByHue={orderedByHue} />
    </Stack>
  );
};
