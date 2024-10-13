import {Avatar, Chip, Typography} from "@mui/material";
import {memo} from "react";

export const ColorChip = memo(({ color }) => {
  const style = { bgcolor: color };
  const avatar = <Avatar sx={style}> </Avatar>;
  const label = (
    <Typography fontFamily="IBM Plex Mono" fontStyle="italic" fontWeigth={300}>
      {color}
    </Typography>
  );
  return <Chip avatar={avatar} label={label} />;
});
