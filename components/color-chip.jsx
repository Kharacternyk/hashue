import {Avatar, Chip, Typography} from "@mui/material";
import {memo} from "react";

export const ColorChip = memo(({ color }) => {
  const style = { bgcolor: color };
  const avatar = <Avatar sx={style}> </Avatar>;
  const label = (
    <Typography fontFamily="IBM Plex Mono" fontSize="0.75rem">
      {color}
    </Typography>
  );
  return <Chip avatar={avatar} label={label} />;
});
