import {Stack} from "@mui/material";
import {useEffect, useState} from "react";
import {ColorChip} from "./color-chip";

export const ColorGrid = ({ query }) => {
  const [chips, setChips] = useState(defaultChips);
  const trimmedQuery = query.trim();

  useEffect(() => {
    if (query.length > 0) {
      const token = { cancelled: false };

      crypto.subtle
        .digest("SHA-256", encoder.encode(trimmedQuery).buffer)
        .then((hash) => {
          if (token.cancelled) {
            return;
          }

          const newChips = [];

          for (let i = 0; i < hash.byteLength - 2; ++i) {
            const color = toHex(hash.slice(i, i + 3));

            newChips.push(<ColorChip color={color} key={i} />);
          }

          setChips(newChips);
        });

      return () => {
        token.cancelled = true;
      };
    } else {
      setChips(defaultChips);
    }
  }, [trimmedQuery]);

  const rows = [];

  for (let i = 0; i < chips.length - 2; i += 3) {
    rows.push(
      <Stack direction="row" key={i}>
        {chips.slice(i, i + 3)}
      </Stack>
    );
  }

  return <Stack>{rows}</Stack>;
};

const defaultChips = [];

for (let i = 0; i < 30; ++i) {
  defaultChips.push(<ColorChip color="#000000" key={i} />);
}

const toHex = (buffer) =>
  "#" +
  [...new Uint8Array(buffer)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

const encoder = new TextEncoder();
