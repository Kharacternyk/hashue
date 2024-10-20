import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { toHex } from "../functions/to-hex";
import { ColorChip } from "./color-chip";

export const ColorGrid = ({ queryBytes, orderedByHue = false }) => {
  const [colors, setColors] = useState(defaultColors);

  useEffect(() => {
    if (queryBytes.length > 0) {
      const token = { cancelled: false };

      crypto.subtle.digest("SHA-256", queryBytes.buffer).then((hash) => {
        if (token.cancelled) {
          return;
        }

        const newColors = [];

        for (let i = 0; i < hash.byteLength - 2; ++i) {
          const rgb = [...new Uint8Array(hash.slice(i, i + 3))];
          const maxChannel = rgb.reduce((x, y) => Math.max(x, y));
          const minChannel = rgb.reduce((x, y) => Math.min(x, y));
          const range = maxChannel - minChannel;

          newColors.push({
            hex: "#" + toHex(rgb).toUpperCase(),
            hue:
              range == 0
                ? 0
                : rgb[0] == maxChannel
                ? ((rgb[1] - rgb[2]) / range) % 6
                : rgb[1] == maxChannel
                ? (rgb[2] - rgb[0]) / range + 2
                : (rgb[0] - rgb[1]) / range + 4,
          });
        }

        setColors(newColors);
      });

      return () => {
        token.cancelled = true;
      };
    } else {
      setColors(defaultColors);
    }
  }, [queryBytes]);

  const rows = [];
  const orderedColors = orderedByHue
    ? colors.toSorted((x, y) => x.hue - y.hue)
    : colors;

  for (let i = 0; i < colors.length - 2; i += 3) {
    const row = orderedColors
      .slice(i, i + 3)
      .map(({ hex }, i) => <ColorChip color={hex} key={i} />);

    rows.push(
      <Stack direction="row" key={i}>
        {row}
      </Stack>
    );
  }

  return <Stack>{rows}</Stack>;
};

const defaultColors = [];

for (let i = 0; i < 30; ++i) {
  defaultColors.push({ hex: "#000000", hue: 0 });
}
