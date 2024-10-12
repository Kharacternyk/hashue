import {Paper, Stack} from "@mui/material";
import {useEffect, useState} from "react";
import {ColorChip} from "./color-chip";

export const Card = ({ query }) => {
  const [colors, setColors] = useState(null);
  const trimmedQuery = query.trim();

  useEffect(() => {
    setColors(null);

    if (query.length > 0) {
      crypto.subtle
        .digest("SHA-256", encoder.encode(trimmedQuery).buffer)
        .then((hash) => {
          setColors(
            [toHex(hash.slice(0, 3)), toHex(hash.slice(-3))].map((color) => (
              <ColorChip color={color} />
            ))
          );
        });
    }
  }, [trimmedQuery]);

  if (colors === null) {
    return null;
  }

  return (
    <Paper elevation={16}>
      <Stack direction="row">{colors}</Stack>
    </Paper>
  );
};

const toHex = (buffer) =>
  "#" +
  [...new Uint8Array(buffer)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

const encoder = new TextEncoder();
