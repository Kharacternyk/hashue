import {Stack} from "@mui/material";
import {useEffect, useState} from "react";
import {ColorChip} from "./color-chip";

export const Card = ({ query }) => {
  const [chips, setChips] = useState([]);
  const trimmedQuery = query.trim();

  useEffect(() => {
    if (query.length > 0) {
      crypto.subtle
        .digest("SHA-256", encoder.encode(trimmedQuery).buffer)
        .then((hash) => {
          const newChips = [];

          for (let i = 0; i < hash.byteLength - 2; ++i) {
            const color = toHex(hash.slice(i, i + 3));

            newChips.push(<ColorChip color={color} />);
          }

          setChips(newChips);
        });
    } else {
      setChips([]);
    }
  }, [trimmedQuery]);

  const rows = [];

  for (let i = 0; i < chips.length - 2; i += 3) {
    rows.push(<Stack direction="row">{chips.slice(i, i + 3)}</Stack>);
  }

  return <Stack>{rows}</Stack>;
};

const toHex = (buffer) =>
  "#" +
  [...new Uint8Array(buffer)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

const encoder = new TextEncoder();
